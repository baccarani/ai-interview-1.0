import { Button } from '../../components/ui/button';
import { useRecorderPermission } from './useRecorderPermission';
import axios from 'axios'
import { ChatResponse } from "@/services/OpenaiService";
import { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';


interface RecorderProps {
    fileName: string;
    addMessage: (newMessage: ChatResponse) => void;
}

const Recorder = ({ fileName, addMessage }: RecorderProps) => {
    const recorder = useRecorderPermission('audio');
    const API_URL = 'https://api.openai.com/v1/audio/transcriptions';
    const [isRecording, setIsRecording] = useState(false);

    const toggleRecording = async () => {
        setIsRecording(!isRecording);

        if (isRecording) {
            await recorder.stopRecording()
            let blob = await recorder.getBlob()

            let formData = new FormData();
            formData.append("file", blob, `${fileName}.mp3`);
            formData.append("model", "whisper-1");

            let response = await postData(API_URL, formData);

            const newMessage: ChatResponse = {
                role: "user",
                content: response.data.text,
            };

            addMessage(newMessage);
        } else {
            recorder.startRecording()
        }
    }

    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}`,
            'Content-Type': 'multipart/form-data',
        },
    });

    const postData = async (url: string, data: any) => {
        return await axiosInstance.post(url, data)
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Button onClick={toggleRecording}>
                <div className="icon-container">
                    {isRecording ? <MicOff className="icon" /> : <Mic className="icon" />} 
                </div>
            </Button>
        </div>
    );
};

export default Recorder;