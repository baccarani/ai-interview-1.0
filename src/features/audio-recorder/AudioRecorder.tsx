import { useReactMediaRecorder } from "react-media-recorder";
import { Button } from '../../components/ui/button';

const AudioRecorder = () => {
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

    return (
        <div className="flex flex-col items-center justify-center">
            <p>{status}</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button onClick={startRecording}>Start Recording</Button>
                <Button onClick={stopRecording}>Stop Recording</Button>
            </div>
            <audio src={mediaBlobUrl} controls autoPlay className="m-2" />
            {mediaBlobUrl && <a href={mediaBlobUrl} download="recording.ogg" className="m-2">Download recording</a>}
        </div>
    );
};

export default AudioRecorder;