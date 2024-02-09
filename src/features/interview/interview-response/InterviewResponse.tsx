import Recorder from "@/features/recorder/Recorder";
import { ChatResponse } from "@/services/OpenaiService";

interface InterviewResponseProps {
  addMessage: (newMessage: ChatResponse) => void;
}

const InterviewResponse = ({ addMessage }: InterviewResponseProps) => {
  return (
    <div className="pt-5">
      <Recorder fileName="default" addMessage={addMessage} />
    </div>
  );
};

export default InterviewResponse;
