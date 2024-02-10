import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { Card } from "../ui/card";
import { useState } from "react";
import RoleSelectorOptions from "./role-selector-options/RoleSelectorOptions";
import { Roles } from "./Roles";

const RoleSelector = () => {
  const [currentRole, setCurrentRole] = useState<Roles>(Roles.PRODUCT_MANAGER);

  return (
    <Card className="p-5 flex flex-col gap-5">
      <div>
        <h3 className="text-xl font-semibold mb-3">Select Your Current Role</h3>
        <RoleSelectorOptions
          roles={Object.values(Roles)}
          setCurrentRole={setCurrentRole}
          currentRole={currentRole}
        />
      </div>

      <div>
        <Link
          to={`/interview?role=${encodeURIComponent(currentRole)}`}
          className={buttonVariants({ variant: "default" })}
        >
          Start Interview
        </Link>
      </div>
    </Card>
  );
};

export default RoleSelector;
