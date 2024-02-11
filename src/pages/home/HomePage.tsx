import { Card } from "@/components/ui/card";
import InterviewSetup from "@/features/interview-setup/InterviewSetup";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";

const HomePage = () => {
  return (
    <Layout>
      <Container className="grid grid-cols-1 gap-5 py-5">
        <Card className="p-5">
          <h1 className="text-2xl font-semibold">AI Interview</h1>
          <p className="font-light">
            Hone your interview skills by practicing with AI
          </p>
        </Card>
        <InterviewSetup />
      </Container>
    </Layout>
  );
};
export default HomePage;
