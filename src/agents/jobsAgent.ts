import { ZaraAgent, AgentContext, AgentResponse } from './ZaraAgent';
import { MockJobsAPI } from '../services/mockJobsAPI';
import { MockSMSAPI } from '../services/mockSMSAPI';

export class JobsAgent implements ZaraAgent {
  id = 'jobs';
  name = 'Jobs & Livelihoods Agent';
  shortName = 'Jobs';
  category = 'Employment';
  description = 'Hyperlocal jobs discovery, CV builder assistance & interview prep.';
  icon = 'Briefcase';
  color = '#10b981';
  capabilities = [
    'find jobs',
    'application status',
    'CV assistance',
    'interview preparation'
  ];

  canHandle(intent: string): boolean {
    return intent === 'job_search';
  }

  async start(context: AgentContext): Promise<AgentResponse> {
    // If entity was already extracted
    if (context.entities.category) {
      return this.renderJobsList(context.entities.category, context);
    }

    return {
      screen: {
        id: 'jobs-main-menu',
        type: 'menu',
        title: 'Jobs Agent',
        prompt: 'Jobs Agent\n\nWhat kind of work?\n\n1. Retail\n2. Admin\n3. Technology\n4. Security\n5. General\n6. Other\n\n0. Main menu',
        options: [
          { key: '1', label: 'Retail' },
          { key: '2', label: 'Admin' },
          { key: '3', label: 'Technology' },
          { key: '4', label: 'Security' },
          { key: '5', label: 'General' },
          { key: '6', label: 'Other' },
          { key: '0', label: 'Main menu' }
        ],
        footer: 'Reply:'
      },
      workflowState: {
        workflowName: 'Job Search',
        step: 1,
        status: 'Selecting career category',
        data: context.sessionData
      }
    };
  }

  async handle(input: string, context: AgentContext): Promise<AgentResponse> {
    const trimmed = input.trim();
    const currentScreenId = context.sessionData['currentScreenId'] || 'jobs-main-menu';

    if (currentScreenId === 'jobs-main-menu') {
      let category = 'technology';
      if (trimmed === '1') category = 'retail';
      else if (trimmed === '2') category = 'admin';
      else if (trimmed === '3') category = 'technology';
      else if (trimmed === '4') category = 'security';
      else if (trimmed === '5' || trimmed === '6') category = 'general';

      return this.renderJobsList(category, context);
    }

    if (currentScreenId === 'jobs-list') {
      const category = context.sessionData['selectedCategory'] || 'technology';
      const jobs = await MockJobsAPI.search(category);
      const index = parseInt(trimmed, 10) - 1;
      const selectedJob = jobs[index] || jobs[0];

      context.sessionData['currentJob'] = selectedJob;

      return {
        screen: {
          id: 'job-detail',
          type: 'menu',
          title: selectedJob.title,
          prompt: `${selectedJob.title}\n${selectedJob.company}\nSalary: ${selectedJob.salary}\nLoc: ${selectedJob.location}\n\n1. Send details by SMS\n2. Save job\n3. Search again\n0. Main menu`,
          options: [
            { key: '1', label: 'Send details by SMS' },
            { key: '2', label: 'Save job' },
            { key: '3', label: 'Search again' },
            { key: '0', label: 'Main menu' }
          ],
          footer: 'Reply:'
        },
        workflowState: {
          workflowName: 'Job Opportunity Details',
          step: 3,
          status: `Reviewing ${selectedJob.title}`,
          data: context.sessionData
        }
      };
    }

    if (currentScreenId === 'job-detail') {
      const job = context.sessionData['currentJob'];
      if (trimmed === '1') {
        const smsContent = `Zara Jobs: ${job.title} at ${job.company}. Salary: ${job.salary}. Location: ${job.location}. Apply reference: ZARA-JOB-${job.id.slice(-4)}. Free USSD reply to apply.`;
        await MockSMSAPI.send(context.msisdn, smsContent);

        return {
          screen: {
            id: 'job-sms-sent',
            type: 'result',
            title: 'Job Details Sent',
            prompt: `Job spec for ${job.title} sent by SMS to ${context.msisdn}.\n\n1. Search more jobs\n2. Main menu\n0. Exit`,
            options: [
              { key: '1', label: 'Search more jobs' },
              { key: '2', label: 'Main menu' },
              { key: '0', label: 'Exit' }
            ],
            footer: 'Reply:'
          },
          crossChannelDispatch: {
            channel: 'sms',
            recipient: context.msisdn,
            content: smsContent,
            status: 'sent'
          },
          workflowState: {
            workflowName: 'Cross-Channel SMS Handoff',
            step: 4,
            status: 'Job details dispatched via SMS',
            data: context.sessionData
          }
        };
      } else if (trimmed === '2') {
        return {
          screen: {
            id: 'job-saved',
            type: 'result',
            title: 'Job Saved',
            prompt: `Job "${job.title}" saved to your Zara Profile.\n\n1. Search more jobs\n2. Main menu`,
            options: [
              { key: '1', label: 'Search more jobs' },
              { key: '2', label: 'Main menu' }
            ],
            footer: 'Reply:'
          },
          workflowState: {
            workflowName: 'Job Saved',
            step: 4,
            status: 'Saved to user bookmarks',
            data: context.sessionData
          }
        };
      } else if (trimmed === '3') {
        return this.start(context);
      }
    }

    return this.start(context);
  }

  private async renderJobsList(category: string, context: AgentContext): Promise<AgentResponse> {
    context.sessionData['selectedCategory'] = category;
    const jobs = await MockJobsAPI.search(category);
    const options = jobs.map((j, i) => ({ key: String(i + 1), label: j.title }));
    const listText = jobs.map((j, i) => `${i + 1}. ${j.title}`).join('\n');

    return {
      apiCall: {
        name: 'JobsMarketplaceAPI.search()',
        endpoint: `/v1/jobs?cat=${category}&lat=-26.2041&lng=28.0473`,
        method: 'GET',
        status: 200,
        latencyMs: 380,
        result: { count: jobs.length }
      },
      screen: {
        id: 'jobs-list',
        type: 'menu',
        title: 'Jobs Near You',
        prompt: `Jobs near you:\n\n${listText}\n\n0. Back`,
        options: [...options, { key: '0', label: 'Back' }],
        footer: 'Reply:'
      },
      workflowState: {
        workflowName: 'Job Search',
        step: 2,
        status: `Listing ${category} opportunities`,
        data: context.sessionData
      }
    };
  }
}
