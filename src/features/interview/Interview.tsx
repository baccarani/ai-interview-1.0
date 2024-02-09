import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChatResponse } from "@/services/OpenaiService";
import Chat from "@/components/chat/Chat";
import InterviewResponse from "./interview-response/InterviewResponse";
import axios from "axios";

type Props = {
  role: string;
};

const Interview = ({ role }: Props) => {
  const [messages, setMessages] = useState<ChatResponse[]>([
    {
      role: "assistant",
      content:
        "What experience do you have in leading the development of a new product or feature?",
    },
    {
      role: "user",
      content: "I have experience working with building ai interviews",
    },
    {
      role: "assistant",
      content:
        "That's impressive! Leading the development of AI interviews involves a deep understanding of both artificial intelligence and user experience design. It's crucial to ensure that the AI accurately evaluates candidates while providing a seamless and intuitive interface for both candidates and interviewers. Could you share more about your specific role and the challenges you faced during this project?",
    },
  ]);

  const addMessage = (newMessage: ChatResponse) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const chatFormData = {
      messages: [...messages, newMessage],
      model: "gpt-3.5-turbo",
    };
    postData(API_URL, chatFormData).then((chatResponse) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: chatResponse.data.choices[0].message.content,
          role: "assistant",
        },
      ]);
    });
  };

  const API_URL = "https://api.openai.com/v1/chat/completions";

  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const postData = async (url: string, data: any) => {
    return await axiosInstance.post(url, data);
  };

  return (
    <Card className="p-5">
      <Chat messages={messages} />
      <InterviewResponse addMessage={addMessage} />
    </Card>
  );
};

export default Interview;
