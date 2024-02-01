import ResumeUploader from "@/components/resume-uploader/ResumeUploader";
import RoleSelector from "@/components/role-selector/RoleSelector";

const InterviewSetup = () => {
  return (
    <>
      <ResumeUploader />
      <p className="text-center font-semibold">OR</p>
      <RoleSelector />
    </>
  );
};

export default InterviewSetup;
