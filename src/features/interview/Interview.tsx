import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChatResponse, openaiService } from "@/services/OpenaiService";
import Chat from "@/components/chat/Chat";
import InterviewResponse from "./interview-response/InterviewResponse";
import axios from "axios";

type Props = {
  role: string;
};

const Interview = ({ role }: Props) => {
  const [messages, setMessages] = useState<ChatResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let ignore = false;
    (async () => {
      setIsLoading(true);
      const initialInterview = await openaiService.startQuestions(role);
      if (initialInterview && !ignore) {
        setMessages(initialInterview);
      }
      setIsLoading(false);
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const addMessage = (newMessage: ChatResponse) => {
    setIsLoading(true);
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

    setIsLoading(false);
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
      <Chat messages={messages} isLoading={isLoading} />
      <InterviewResponse addMessage={addMessage} />
    </Card>
  );
};

export default Interview;
