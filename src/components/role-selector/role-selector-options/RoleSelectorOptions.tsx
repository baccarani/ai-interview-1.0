import { Button, buttonVariants } from "@/components/ui/button";
import { Roles } from "../Roles";
import { Dispatch, SetStateAction } from "react";

type Props = {
  roles: Roles[];
  setCurrentRole: Dispatch<SetStateAction<Roles>>;
  currentRole: Roles;
};

export const highlightedRoleClassNames =
  "bg-blue-100 dark:bg-blue-500 border-blue-500 dark:border-blue-700 border text-blue-700 dark:text-blue-900 hover:bg-blue-100 dark:hover:bg-blue-600";

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
              currentRole === role ? highlightedRoleClassNames : "border"
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
