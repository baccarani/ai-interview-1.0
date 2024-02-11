import OpenAI from "openai";
import {
  ChatCompletion,
  ChatCompletionMessage,
  ChatCompletionMessageParam,
} from "openai/resources/index.mjs";
import { OpenaiModelTypes } from "./OpenaiModelTypes";

export interface ChatResponse {
  role: string;
  content: string;
}

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

const chat = (messages: ChatResponse[]): Promise<ChatCompletion> => {
  return openai.chat.completions.create({
    messages: messages.map((message) => message as ChatCompletionMessage),
    model: OpenaiModelTypes.GPT_3_TURBO,
  });
};

const startQuestions = async (
  role = "Product Manager"
): Promise<ChatResponse[]> => {
  const message: ChatCompletionMessageParam = {
    role: "system",
    content: `You are interviewing a person. Ask short questions relevant to the role. Keep your responses short, and be funny sometimes. Only ask one question at a time, and not to give feedback. It should be like a real interview. Start the interview by greeting the uers, and thank the user for taking the time to dicuss the candidacy for the ${role} opening.`,
  };

  const response = await chat([message]);

  return response.choices.map((choice) => ({
    role: "assistant",
    content: choice.message.content ?? "",
  }));
};

const getResponse = async (
  messages: ChatResponse[],
  newResponse: string
): Promise<ChatResponse[]> => {
  const newMessage: ChatResponse = {
    role: "user",
    content: newResponse,
  };

  messages.push(newMessage);

  const response = await chat(messages);

  messages.push({
    role: "assistant",
    content: response.choices[0].message.content ?? "",
  });

  return messages;
};

const openaiService = {
  startQuestions,
  getResponse,
};

Object.freeze(openaiService);

export { openaiService };
