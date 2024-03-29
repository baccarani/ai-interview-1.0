import Interview from "@/features/interview/Interview";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";
import { useSearchParams } from "react-router-dom";

const InterviewPage = () => {
  const [searchParams] = useSearchParams();

  const role = searchParams.get("role") ?? "";

  return (
    <Layout>
      <Container className="grid grid-cols-1 gap-5">
        <div className="py-5 bg-black-100 border-none">
          <h3 className="font-semibold">Role: {role}</h3>
        </div>
        <Interview role={role} />
      </Container>
    </Layout>
  );
};

export default InterviewPage;
