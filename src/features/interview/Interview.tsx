import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChatResponse } from "@/services/OpenaiService";
import Chat from "@/components/chat/Chat";
import InterviewResponse from "./interview-response/InterviewResponse";

const Interview = () => {
  const [messages] = useState<ChatResponse[]>([
    {
      role: "assistant",
      content:
        "What experience do you have in leading the development of a new product or feature?",
    },
    {
      role: "user",
      content: "I have experience working with building ai interviews",
    },
    {
      role: "assistant",
      content:
        "That's impressive! Leading the development of AI interviews involves a deep understanding of both artificial intelligence and user experience design. It's crucial to ensure that the AI accurately evaluates candidates while providing a seamless and intuitive interface for both candidates and interviewers. Could you share more about your specific role and the challenges you faced during this project?",
    },
  ]);

  return (
    <Card className="p-5">
      <Chat messages={messages} />
      <InterviewResponse />
    </Card>
  );
};

export default Interview;
