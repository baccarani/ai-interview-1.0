import { describe, test } from "vitest";
// import { render } from "@testing-library/react";
// import App from "./App";

describe("App", () => {
  test("Should render home page component", () => {
    // render(<App />);
  });
});

// Temporarily commenting out above test as it is failing with below error

// Error: The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' }).
//  ❯ new OpenAI node_modules/openai/src/index.ts:112:13
//  ❯ src/services/OpenaiService.ts:16:16
//      14| const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
//      15| 
//      16| const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
//        |                ^
//      17| 
