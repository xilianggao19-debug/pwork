
import { GoogleGenAI, Type } from "@google/genai";
import { WorkspaceData } from "./types";

export const generateDailySummary = async (data: WorkspaceData): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Please summarize the following personal workspace activities for the day into a professional daily report.
    Include key achievements, pending tasks, and main insights from memos and decisions.
    
    Data:
    - Completed Todos: ${data.todos.filter(t => t.completed).map(t => t.text).join(', ')}
    - Pending Todos: ${data.todos.filter(t => !t.completed).map(t => t.text).join(', ')}
    - Daily Work Logs: ${data.dailyWork}
    - Meetings: ${data.meetings.map(m => `${m.time}: ${m.context}`).join('; ')}
    - Memos: ${data.memos}
    - Key Outcomes: ${data.outcomes.filter(o => o.trim() !== '').join(', ')}
    - Key Decisions: ${data.decisions.map(d => (d.important ? '[★] ' : '') + d.text).join(', ')}
    
    Respond in a structured Markdown format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "Failed to generate summary.";
  } catch (error) {
    console.error("Gemini AI error:", error);
    return "AI generation failed. Please check your connection or API configuration.";
  }
};
