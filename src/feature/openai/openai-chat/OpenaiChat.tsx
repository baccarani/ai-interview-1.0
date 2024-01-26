import { useEffect, useState } from "react";
import { ChatResponse, openaiService } from "../../../services/OpenaiService";

const OpenaiChat = () => {
  const [messages, setMessages] = useState<ChatResponse[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let ignore = true;
    (async () => {
      try {
        setIsLoading(true);
        const response = await openaiService.startQuestions();
        if (response) {
          setMessages(response);
        }
      } catch (e: unknown) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      ignore = false;
    };
  }, []);

  const answerQuestion = async () => {
    setIsLoading(true);
    const response = await openaiService.getResponse(messages, answer);

    setMessages(response);
    setAnswer("");
    setIsLoading(false);
  };

  const changeAnswer = (value: string) => {
    setAnswer(value);
  };

  return (
    <div className="p-3 flex w-[45rem] flex-col gap-5 border rounded dropshadow-md border-stone-500 bg-stone-900">
      {isLoading ? <p>Loading...</p> : null}
      <ul className="flex flex-col gap-3">
        {messages.map((message) => {
          return (
            <li
              key={message.content}
              className={`border max-w-[75%] rounded border-zinc-500 p-3 flex flex-col gap-2 text-left ${
                message.role === "user" ? "ml-auto" : ""
              }`}
            >
              <p className="font-semibold">{message.role}</p>
              <p>{message.content}</p>
            </li>
          );
        })}
      </ul>
      <textarea
        value={answer}
        onChange={(event) => changeAnswer(event.target.value)}
      />
      <button
        className="border rounded border-stone-500"
        onClick={answerQuestion}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Answer Question"}
      </button>
    </div>
  );
};

export default OpenaiChat;
