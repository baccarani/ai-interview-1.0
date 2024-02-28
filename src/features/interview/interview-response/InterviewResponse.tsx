import Recorder from "@/features/recorder/Recorder";
import { ChatResponse } from "@/services/OpenaiService";

interface InterviewResponseProps {
  addMessage: (newMessage: ChatResponse) => void;
  isProcessingAudio: boolean;
  setIsProcessingAudio: (isProcessing: boolean) => void;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (isAudioPlaying: boolean) => void;
}

const InterviewResponse = ({ addMessage, isProcessingAudio, setIsProcessingAudio, isAudioPlaying, setIsAudioPlaying }: InterviewResponseProps) => {
  return (
    <div className="pt-5">
      <Recorder fileName="default" addMessage={addMessage} isProcessingAudio={isProcessingAudio} setIsProcessingAudio={setIsProcessingAudio} isAudioPlaying={isAudioPlaying} setIsAudioPlaying={setIsAudioPlaying} />
    </div>
  );
};

export default InterviewResponse;
