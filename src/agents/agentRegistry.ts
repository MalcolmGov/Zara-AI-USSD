import { ZaraAgent } from './ZaraAgent';
import { ElectricityAgent } from './electricityAgent';
import { GovernmentAgent } from './governmentAgent';
import { JobsAgent } from './jobsAgent';
import { FinancialAgent } from './financialAgent';
import { HealthcareAgent } from './healthcareAgent';
import { AgricultureAgent } from './agricultureAgent';
import { SmeAgent } from './smeAgent';
import { GeneralAgent } from './generalAgent';

export class AgentRegistry {
  private static agents: Map<string, ZaraAgent> = new Map();

  static initialize() {
    if (this.agents.size > 0) return;

    const list: ZaraAgent[] = [
      new ElectricityAgent(),
      new GovernmentAgent(),
      new JobsAgent(),
      new FinancialAgent(),
      new HealthcareAgent(),
      new AgricultureAgent(),
      new SmeAgent(),
      new GeneralAgent()
    ];

    list.forEach(agent => {
      this.agents.set(agent.id, agent);
    });
  }

  static getAgent(id: string): ZaraAgent {
    this.initialize();
    return this.agents.get(id) || this.agents.get('general')!;
  }

  static findAgentForIntent(intent: string): ZaraAgent {
    this.initialize();
    for (const agent of this.agents.values()) {
      if (agent.canHandle(intent)) {
        return agent;
      }
    }
    return this.agents.get('general')!;
  }

  static getAllAgents(): ZaraAgent[] {
    this.initialize();
    return Array.from(this.agents.values());
  }
}
