import { Button } from '../../components/ui/button';
import { useRecorderPermission } from './useRecorderPermission';
import axios from 'axios'
import { ChatResponse } from "@/services/OpenaiService";
import { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';


interface RecorderProps {
    fileName: string;
    addMessage: (newMessage: ChatResponse) => void;
    isProcessingAudio: boolean;
    setIsProcessingAudio: (isProcessing: boolean) => void;
    isAudioPlaying: boolean;
    setIsAudioPlaying: (isAudioPlaying: boolean) => void;
}

const Recorder = ({ fileName, addMessage, isProcessingAudio, setIsProcessingAudio, isAudioPlaying, setIsAudioPlaying }: RecorderProps) => {
    const recorder = useRecorderPermission('audio');
    const [isRecording, setIsRecording] = useState(false);

    const toggleRecording = async () => {
        setIsRecording(!isRecording);

        if (isRecording) {
            setIsProcessingAudio(true);
            setIsAudioPlaying(true);
            await recorder.stopRecording()
            let blob = await recorder.getBlob()

            let formData = new FormData();
            formData.append("file", blob, `${fileName}.mp3`);
            formData.append("model", "whisper-1");

            let response = await postData("https://api.openai.com/v1/audio/transcriptions", formData);

            const newMessage: ChatResponse = {
                role: "user",
                content: response.data.text + " If I ask about topics other than the interview, don't answer the off-topic question. Instead, redirect me back to the interview immediately and sternly. Tell me that I am going off-topic ONLY IF I am going off-topic.",
            };

            addMessage(newMessage);
        } else {
            recorder.startRecording()
        }
    }

    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'multipart/form-data',
        },
    });

    const postData = async (url: string, data: any) => {
        return await axiosInstance.post(url, data)
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Button onClick={toggleRecording} disabled={isProcessingAudio || isAudioPlaying}>
                <div className="icon-container">
                    {isRecording ? <MicOff className="icon" /> : <Mic className="icon" />} 
                </div>
            </Button>
        </div>
    );
};

export default Recorder;