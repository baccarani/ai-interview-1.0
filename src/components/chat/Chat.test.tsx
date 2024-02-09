import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Chat from "./Chat";
import { ChatResponse } from "@/services/OpenaiService";

describe("Chat", () => {
  test("Should return the proper message when messages is empty", () => {
    const messages: ChatResponse[] = [];
    render(<Chat messages={messages} />);

    expect(screen.getByText(/No Messages/)).toBeDefined();
  });

  test("Should display the messages", () => {
    const messages: ChatResponse[] = [
      {
        role: "assistant",
        content: "This is a test message",
      },
    ];

    render(<Chat messages={messages} />);

    expect(screen.getByText(messages[0].content)).toBeDefined();
  });

  test("Should display the role", () => {
    const messages: ChatResponse[] = [
      {
        role: "assistant",
        content: "This is a test message",
      },
    ];

    render(<Chat messages={messages} />);

    expect(screen.getByText(messages[0].role)).toBeDefined();
  });
});
