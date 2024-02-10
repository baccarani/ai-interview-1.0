import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChatResponse } from "@/services/OpenaiService";
import Chat from "@/components/chat/Chat";
import InterviewResponse from "./interview-response/InterviewResponse";
import axios from "axios";
import { OpenaiModelTypes } from "@/services/OpenaiModelTypes";

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
      model: OpenaiModelTypes.GPT_4,
    };
    postData("https://api.openai.com/v1/chat/completions", chatFormData).then((chatResponse) => {
      const assistantMessage = {
        content: chatResponse.data.choices[0].message.content,
        role: "assistant",
      };
  
      postData("https://api.openai.com/v1/audio/speech", {
        model: "tts-1-hd",
        voice: "alloy",
        input: assistantMessage.content,
      }, 'blob').then((audioBlob) => {
        const audio = new Audio(URL.createObjectURL(audioBlob.data));
        setMessages((prevMessages) => [
          ...prevMessages,
          assistantMessage,
        ]);
        audio.play();
      });
    });
  };

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const postData = async (url: string, data: any, responseType: 'json' | 'blob' = 'json') => {
    return await axiosInstance.post(url, data, { responseType });
  };

  return (
    <Card className="p-5">
      <Chat messages={messages} />
      <InterviewResponse addMessage={addMessage} />
    </Card>
  );
};

export default Interview;