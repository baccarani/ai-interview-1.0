import { Card } from "@/components/ui/card";
import Interview from "@/features/interview/Interview";
import Recorder from "@/features/recorder/Recorder";
import { ModeToggle } from "@/features/theme/ModeToggle";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";

const HomePage = () => {
  return (
    <Layout>
      <ModeToggle />
      <Container className="grid grid-cols-1 gap-5 py-5">
        <Card className="p-5">
          <Recorder fileName="random" />
          <h1 className="text-2xl font-semibold">AI Interview</h1>
          <p className="text-slate-500">
            Hone your interview skills practicing with AI
          </p>
        </Card>
        <Interview />
      </Container>
    </Layout>
  );
};
export default HomePage;
