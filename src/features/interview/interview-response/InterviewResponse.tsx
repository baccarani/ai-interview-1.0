import Recorder from "@/features/recorder/Recorder";
import { ChatResponse } from "@/services/OpenaiService";

interface InterviewResponseProps {
  addMessage: (newMessage: ChatResponse) => void;
  isProcessingAudio: boolean;
  setIsProcessingAudio: (isProcessing: boolean) => void;
}

const InterviewResponse = ({ addMessage, isProcessingAudio, setIsProcessingAudio }: InterviewResponseProps) => {
  return (
    <div className="pt-5">
      <Recorder fileName="default" addMessage={addMessage} isProcessingAudio={isProcessingAudio} setIsProcessingAudio={setIsProcessingAudio} />
    </div>
  );
};

export default InterviewResponse;
