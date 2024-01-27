import "./App.css";
import AudioRecorder from "./features/audio-recorder/AudioRecorder";
import { ModeToggle } from "./features/theme/ModeToggle";

function App() {
  return (
    <>
      <ModeToggle />
      <div className="py-4">
      <AudioRecorder />
      </div>
    </>
  );
}

export default App;
