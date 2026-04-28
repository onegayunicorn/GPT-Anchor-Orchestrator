
import { Configuration, OpenAIApi } from 'openai';

export class Planner {
  private openai: OpenAIApi;

  constructor() {
    // Ensure OPENAI_API_KEY is available
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable is required");
    }
    const config = new Configuration({
      apiKey,
    });
    this.openai = new OpenAIApi(config);
  }

  // Generates a plan (array of steps) for a given goal
  async generatePlan(goal: string): Promise<string[]> {
    const prompt = `You are an AI planning assistant. Create a concise, safe, and executable plan for the following goal. Break it into clear steps with actionable items and no sensitive content.

Goal: ${goal}
Plan (list each step on a new line, numbered):`;

    const response = await this.openai.createCompletion({
      model: 'gpt-4',
      prompt,
      max_tokens: 800,
      temperature: 0.2,
      n: 1,
      stop: null,
    });

    const text = response.data.choices?.[0]?.text ?? '';
    // Basic parsing: split lines and clean
    const steps = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map((l) => l.replace(/^[\d.\-]+[\s]*/, ''));

    // Fallback in case the model returns a single paragraph
    if (steps.length === 0) {
      steps.push('Define goal, identify constraints, identify required resources, outline steps, assign responsibilities.');
    }

    // Return as a clean array
    return steps;
  }
}
