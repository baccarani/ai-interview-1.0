import { Card } from "@/components/ui/card";

type Props = {
  role: string;
  text: string;
  className?: string;
  width?: string;
};

const ChatBubble = ({
  role,
  text,
  className = "",
  width = "w-fit max-w-[75%]",
}: Props) => {
  const removeAiInstructions = (text: string) => {
    const aiInstructionsIndex = text.indexOf(" If I ask about topics other than the interview, don't answer the off-topic question. Instead, redirect me back to the interview immediately and sternly. Tell me that I am going off-topic ONLY IF I am going off-topic.");
    return aiInstructionsIndex !== -1 ? text.slice(0, aiInstructionsIndex) : text;
  };

  return (
    <Card className={`p-5 flex flex-col gap-3 ${width} ${className}`}>
      <h5 className="text-lg font-semibold">{role}</h5>
      <p>{removeAiInstructions(text)}</p>
    </Card>
  );
};

export default ChatBubble;
