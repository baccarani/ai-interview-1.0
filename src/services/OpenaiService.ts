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
    content: `You are interviewing a person. Ask short questions relevant to the role. Always keep your responses short to two sentences max all the time, and be funny sometimes. If the user talks about topics other than the interview, redirect them back to the interview immediately and sternly. Always ask a total of 5 interview questions before concluding and providing feedback. Only ask one question at a time, and do not give feedback. It should be like a real interview. Start the interview by greeting the user, and thank the user for taking the time to discuss their candidacy for the ${role} opening.`,
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
