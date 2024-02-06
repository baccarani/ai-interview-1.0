import { ChatResponse } from "@/services/OpenaiService";
import ChatBubble from "./chat-bubble/ChatBubble";
import ChatBubbleLoading from "./chat-bubble/chat-bubble-loading/ChatBubbleLoading";

type Props = {
  messages: ChatResponse[];
};

const Chat = ({ messages }: Props) => {
  if (!messages.length) {
    return <p className="font-semibold">No Messages Available</p>;
  }
  return (
    <ul className="flex flex-col gap-5">
      {messages.map((message) => (
        <li key={message.content}>
          <ChatBubble
            role={message.role}
            text={message.content}
            className={message.role === "assistant" ? "mr-auto" : "ml-auto"}
          />
        </li>
      ))}
      <li>
        <ChatBubbleLoading />
      </li>
    </ul>
  );
};

export default Chat;
