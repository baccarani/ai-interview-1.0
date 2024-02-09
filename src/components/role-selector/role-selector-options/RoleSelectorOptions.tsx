import { Button, buttonVariants } from "@/components/ui/button";
import { Roles } from "../Roles";
import { Dispatch, SetStateAction } from "react";

type Props = {
  roles: Roles[];
  setCurrentRole: Dispatch<SetStateAction<Roles>>;
  currentRole: Roles;
};

const RoleSelectorOptions = ({ roles, currentRole, setCurrentRole }: Props) => {
  const changeRole = (role: Roles) => {
    setCurrentRole(role);
  };

  return (
    <ul className="flex items-center gap-5 flex-wrap">
      {roles.map((role) => (
        <li key={role}>
          <Button
            onClick={() => changeRole(role)}
            className={`${buttonVariants({
              variant: "secondary",
            })} rounded-full ${
              currentRole === role
                ? "bg-blue-100 border-blue-500 border text-blue-700"
                : "border"
            }`}
          >
            {role}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default RoleSelectorOptions;
