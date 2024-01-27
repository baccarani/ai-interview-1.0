import "./App.css";
import { Card } from "./components/ui/card";
import Interview from "./features/interview/Interview";
import Layout from "./layout/Layout";
import Container from "./layout/container/Container";

function App() {
  return (
    <Layout>
      <Container className="grid grid-cols-1 gap-5 py-5">
        <Card className="p-5">
          <h1 className="text-2xl font-semibold">Ai Interview</h1>
          <p className="text-slate-500">
            Hone your interview skills practicing with AI
          </p>
        </Card>
        <Interview />
      </Container>
    </Layout>
  );
}

export default App;
