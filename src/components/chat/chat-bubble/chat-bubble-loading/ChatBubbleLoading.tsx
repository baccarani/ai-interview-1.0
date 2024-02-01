import { Card } from "@/components/ui/card";

const ChatBubbleLoading = () => {
  return (
    <Card className="p-5 flex items-center gap-3 justify-center w-fit max-w-[75%]">
      <p className="font-semibold">Loading...</p>
    </Card>
  );
};

export default ChatBubbleLoading;
