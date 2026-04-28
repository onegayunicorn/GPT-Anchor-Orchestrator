
import { Planner } from './planner';
import { Executor } from './executor';
import { Validator } from './validator';
import { Memory } from './memory';
import { RecoveryAgent } from '../agents/recovery_agent';

export class Engine {
  private planner: Planner;
  private executor: Executor;
  private validator: Validator;
  private memory: Memory;
  private recovery: RecoveryAgent;

  constructor() {
    this.planner = new Planner();
    this.executor = new Executor();
    this.validator = new Validator();
    this.memory = new Memory();
    this.recovery = new RecoveryAgent();
  }

  async run(goal: string): Promise<void> {
    console.log(`🚀 Starting mission: ${goal}`);
    this.memory.addLog(`Mission started: ${goal}`);

    // Guardrail: basic safety and policy checks
    if (!this.policyGuard(goal)) {
      this.memory.addLog(`Policy guardrail blocked the mission: ${goal}`);
      console.log('Policy guardrail: mission blocked.');
      return;
    }

    // Plan
    const plan = await this.planner.generatePlan(goal);
    this.memory.addLog(`Plan generated with ${plan.length} steps.`);

    // Execute each step
    let lastResult: any = { isFinal: false };
    for (const step of plan) {
      try {
        lastResult = await this.executor.executeStep(step);
        this.memory.addLog(`Step result: ${JSON.stringify(lastResult)}`);
      } catch (error) {
        this.memory.addLog(`Failure in step: ${step}. Error: ${error}`);
        const report = await this.recovery.analyzeFailure(step, error);
        const remediated = await this.recovery.attemptRemediation(report);
        
        if (!remediated) {
          this.memory.addLog("Remediation failed. Stopping.");
          return;
        }
      }

      // Early stop if a guardrail flags finality
      if (this.checkCompletion(goal, lastResult)) break;
    }

    // Validate final outcome
    const valid = await this.validator.validate(goal, lastResult);
    if (valid) {
      this.memory.addLog(`Mission completed and validated.`);
    } else {
      this.memory.addLog(`Mission validation failed. Initiating remediation.`);
    }
  }

  // Policy guardrails at the engine level
  private policyGuard(goal: string): boolean {
    // Example guardrails:
    // - No disallowed content (disallowed keywords list)
    // - No harmful actions (e.g., wrongdoing, illegal activity)
    // - Respect resource constraints (abort if obviously unsafe/overly broad)
    const disallowed = ['illicit', 'harm', 'danger', 'weapon', 'exploit'];
    const lower = goal.toLowerCase();
    for (const w of disallowed) {
      if (lower.includes(w)) return false;
    }

    // Optional: length or scope checks
    if (goal.length > 5000) return false;

    return true;
  }

  private checkCompletion(goal: string, lastResult: any): boolean {
    // Logic to determine if the goal has been met
    return !!lastResult?.isFinal;
  }
}

// Entry point for CLI execution
if (require.main === module) {
  const engine = new Engine();
  engine.run("Scaffold a new production repository structure").catch(console.error);
}
