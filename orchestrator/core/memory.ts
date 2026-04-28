
export interface MemoryState {
  goal: string;
  history: Array<{
    step: any;
    result: any;
    verified: boolean;
    timestamp: number;
  }>;
  variables: Record<string, any>;
  status: 'idle' | 'running' | 'completed' | 'failed';
}

export class Memory {
  private state: MemoryState;

  constructor() {
    this.state = {
      goal: '',
      history: [],
      variables: {},
      status: 'idle',
    };
  }

  addLog(log: string) {
    console.log(`[Memory] ${log}`);
  }
}
