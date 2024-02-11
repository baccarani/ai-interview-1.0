import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChatResponse, openaiService } from "@/services/OpenaiService";
import Chat from "@/components/chat/Chat";
import InterviewResponse from "./interview-response/InterviewResponse";
import axios from "axios";
import { OpenaiModelTypes } from "@/services/OpenaiModelTypes";

type Props = {
  role: string;
};

const Interview = ({ role }: Props) => {
  const [messages, setMessages] = useState<ChatResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);

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
      model: OpenaiModelTypes.GPT_3_TURBO,
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
        audio.onended = () => setIsProcessingAudio(false);
      });
    });

    setIsLoading(false);
  };

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const postData = async (url: string, data: any, responseType: 'json' | 'blob' = 'json') => {
    return await axiosInstance.post(url, data, { responseType });
  };

  return (
    <Card className="p-5">
      <Chat messages={messages} isLoading={isLoading} />
      <InterviewResponse addMessage={addMessage} isProcessingAudio={isProcessingAudio} setIsProcessingAudio={setIsProcessingAudio} />
    </Card>
  );
};

export default Interview;