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

const role = "Product Manager";

const chat = (messages: ChatResponse[]): Promise<ChatCompletion> => {
  return openai.chat.completions.create({
    messages: messages.map((message) => message as ChatCompletionMessage),
    model: OpenaiModelTypes.GPT_3_TURBO,
  });
};

const startQuestions = async (): Promise<ChatResponse[]> => {
  const message: ChatCompletionMessageParam = {
    role: "system",
    content: `You are interviewing the user for a ${role} position. Ask short questions that are relevant to a ${role}. Your name is Greg. The user is Travis. Keep responses under 30 words and be funny sometimes. Response in just the string of the question. Only ask one question at a time.`,
    name: "Greg",
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
