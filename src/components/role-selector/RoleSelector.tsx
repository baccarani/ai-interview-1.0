import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { Card } from "../ui/card";
import { useState } from "react";

const RoleSelector = () => {
  const [role] = useState<string>("Product Manager");
  return (
    <Card className="p-5 flex flex-col gap-5">
      <h3 className="text-lg font-semibold">Select Current Role</h3>
      <div>
        <Link
          to={`/interview?role=${encodeURIComponent(role)}`}
          className={buttonVariants({ variant: "default" })}
        >
          Start Interview
        </Link>
      </div>
    </Card>
  );
};

export default RoleSelector;
