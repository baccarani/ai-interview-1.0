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
  return (
    <Card className={`p-5 flex flex-col gap-3 ${width} ${className}`}>
      <h5 className="text-lg font-semibold">{role}</h5>
      <p>{text}</p>
    </Card>
  );
};

export default ChatBubble;
