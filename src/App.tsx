import "./App.css";
import Recorder from "./features/recorder/Recorder";
import { ModeToggle } from "./features/theme/ModeToggle";

function App() {
  return (
    <>
      <ModeToggle />
      <div className="py-4">
      <Recorder fileName="random"/>
      </div>
    </>
  );
}

export default App;
