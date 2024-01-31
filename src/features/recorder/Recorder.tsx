import { Button } from '../../components/ui/button';
import { invokeSaveAsDialog } from 'recordrtc';
import { useRecorderPermission } from './useRecorderPermission';

interface RecorderProps {
    fileName: string;
}

const Recorder = ({ fileName }: RecorderProps) => {

    const recorder = useRecorderPermission('audio')

    const startRecording = async () => {
        recorder.startRecording()
    }

    const stopRecording = async () => {
        await recorder.stopRecording()
        let blob = await recorder.getBlob()
        invokeSaveAsDialog(blob, `${fileName}.webm`)
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