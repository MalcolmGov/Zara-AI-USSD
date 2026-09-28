import { JOBS_DATABASE, JobOpportunity } from '../data/jobsData';

export class MockJobsAPI {
  static async search(category: string, delayMs = 400): Promise<JobOpportunity[]> {
    await new Promise(res => setTimeout(res, delayMs));
    const normalized = category.toLowerCase().trim();
    if (JOBS_DATABASE[normalized]) {
      return JOBS_DATABASE[normalized];
    }
    return JOBS_DATABASE['general'] || [];
  }

  static async getJobById(id: string): Promise<JobOpportunity | undefined> {
    for (const cat of Object.values(JOBS_DATABASE)) {
      const match = cat.find(j => j.id === id);
      if (match) return match;
    }
    return undefined;
  }
}
