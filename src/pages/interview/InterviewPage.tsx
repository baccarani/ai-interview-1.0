import { Card } from "@/components/ui/card";
import Interview from "@/features/interview/Interview";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";
import { useSearchParams } from "react-router-dom";

const InterviewPage = () => {
  const [searchParams] = useSearchParams();

  const role = searchParams.get("role") ?? "";

  return (
    <Layout>
      <Container className="grid grid-cols-1 gap-5 py-5">
        <Card className="p-5">
          <h3 className="font-semibold">Role: {role}</h3>
        </Card>
        <Interview role={role} />
      </Container>
    </Layout>
  );
};

export default InterviewPage;
