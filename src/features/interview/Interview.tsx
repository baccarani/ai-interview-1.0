import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChatResponse, openaiService } from "@/services/OpenaiService";
import Chat from "@/components/chat/Chat";
import InterviewResponse from "./interview-response/InterviewResponse";
import axios, { CancelTokenSource } from "axios";
import { OpenaiModelTypes } from "@/services/OpenaiModelTypes";

type Props = {
  role: string;
};

const Interview = ({ role }: Props) => {
  const [messages, setMessages] = useState<ChatResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    let ignore = false;
    const source = axios.CancelToken.source();
    (async () => {
      setIsLoading(true);
      const initialInterview = await openaiService.startQuestions(role);
      if (initialInterview && !ignore) {
        postData("https://api.openai.com/v1/audio/speech", {
          model: "tts-1-hd",
          voice: "alloy",
          input: initialInterview[0].content,
        }, 'blob', source.token).then((audioBlob) => {
          const audio = new Audio(URL.createObjectURL(audioBlob.data));
          audioRef.current = audio;
          setMessages(initialInterview);
          setIsLoading(false);
          audio.play();
          audio.onended = () => setIsProcessingAudio(false);
        }).catch((thrown) => {
          if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
          } else {
            console.log('Error', thrown);
          }
        });
      }
    })();
    return () => {
      ignore = true;
      source.cancel('Operation canceled by the user.');
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = "";
        isMountedRef.current = false;
      }
    };
  }, []);

  const addMessage = (newMessage: ChatResponse) => {
    const source = axios.CancelToken.source();
    setIsLoading(true);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    const chatFormData = {
      messages: [...messages, newMessage],
      model: OpenaiModelTypes.GPT_3_TURBO,
    };
    postData("https://api.openai.com/v1/chat/completions", chatFormData, 'json', source.token).then((chatResponse) => {
      const assistantMessage = {
        content: chatResponse.data.choices[0].message.content,
        role: "assistant",
      };
      postData("https://api.openai.com/v1/audio/speech", {
        model: "tts-1-hd",
        voice: "alloy",
        input: assistantMessage.content,
      }, 'blob', source.token).then((audioBlob) => {
        if (isMountedRef.current) {
          const audio = new Audio(URL.createObjectURL(audioBlob.data));
          audioRef.current = audio;
          setMessages((prevMessages) => [
            ...prevMessages,
            assistantMessage,
          ]);
          setIsLoading(false);
          audio.play();
          audio.onended = () => {
            if (isMountedRef.current) {
              setIsProcessingAudio(false);
            }
          };
        }
      }).catch((thrown) => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
        } else {
          console.log('Error', thrown);}
      });
    }).catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } else {
        console.log('Error', thrown);}
    });
  };

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const postData = async (url: string, data: any, responseType: 'json' | 'blob' = 'json', cancelToken: CancelTokenSource['token']) => {
    return await axiosInstance.post(url, data, { responseType, cancelToken });
  };

  return (
    <Card className="p-5">
      <Chat messages={messages} isLoading={isLoading} />
      <InterviewResponse addMessage={addMessage} isProcessingAudio={isProcessingAudio} setIsProcessingAudio={setIsProcessingAudio} />
    </Card>
  );
};

export default Interview;