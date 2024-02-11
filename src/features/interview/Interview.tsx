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
  const [isProcessingAudio, setIsProcessingAudio] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      setIsLoading(true);
      const initialInterview = await openaiService.startQuestions(role);
      if (initialInterview && !ignore) {
        postData("https://api.openai.com/v1/audio/speech", {
          model: "tts-1-hd",
          voice: "alloy",
          input: initialInterview[0].content,
        }, 'blob').then((audioBlob) => {
          const audio = new Audio(URL.createObjectURL(audioBlob.data));
          audioRef.current = audio;
          setMessages(initialInterview);
          setIsLoading(false);
          audio.play();
          audio.onended = () => setIsProcessingAudio(false);
        });
      }
    })();
    return () => {
      ignore = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = "";
      }
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
        audioRef.current = audio;
        setMessages((prevMessages) => [
          ...prevMessages,
          assistantMessage,
        ]);
        setIsLoading(false);
        audio.play();
        audio.onended = () => setIsProcessingAudio(false);
      });
    });
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