import { Button } from '../../components/ui/button';
// import { invokeSaveAsDialog } from 'recordrtc';
import { useRecorderPermission } from './useRecorderPermission';
import axios from 'axios'

interface RecorderProps {
    fileName: string;
}

const Recorder = ({ fileName }: RecorderProps) => {
    const recorder = useRecorderPermission('audio')
    const API_URL = 'https://api.openai.com/v1/audio/transcriptions'

    const startRecording = async () => {
        recorder.startRecording()
    }

    const stopRecording = async () => {
        await recorder.stopRecording()
        let blob = await recorder.getBlob()
        // invokeSaveAsDialog(blob, `${fileName}.mp3`)

        let formData = new FormData();
        formData.append("file", blob, `${fileName}.mp3`);
        formData.append("model", "whisper-1");

        let response = await postData(API_URL, formData);
        console.log(response);
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
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button onClick={startRecording}>Start Recording</Button>
                <Button onClick={stopRecording}>Stop Recording</Button>
            </div>
        </div>
    );
};

export default Recorder;