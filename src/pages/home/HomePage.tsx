import { Card } from "@/components/ui/card";
import InterviewSetup from "@/features/interview-setup/InterviewSetup";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";

const HomePage = () => {
  return (
    <Layout>
      <Container className="grid grid-cols-1 gap-4 py-4">
        <div>
          <h1 className="text-6xl font-semibold leading-tight mt-4 mb-16">
            <span className="bg-gradient-to-r from-blue-500 to-red-500 text-transparent bg-clip-text">
              Hello, Baccarani.
            </span>
            <br />
            <span className="text-gray-400">
              Ready to ace your interview?
            </span>
          </h1>
        </div>
        <InterviewSetup />
      </Container>
    </Layout>
  );
};
export default HomePage;
