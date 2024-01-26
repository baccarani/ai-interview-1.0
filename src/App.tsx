import { useState } from "react";
import "./App.css";
import OpenaiChat from "./feature/openai/openai-chat/OpenaiChat";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <OpenaiChat />
    </>
  );
}

export default App;
