import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import RoleSelectorOptions, {
  highlightedRoleClassNames,
} from "./RoleSelectorOptions";
import { Roles } from "../Roles";

describe("RoleSelectorOptions", () => {
  const mockSetCurrentRole = vi.fn();
  const roles = Object.values(Roles);

  test("Should render role selector options component", () => {
    const currentRole: Roles = Roles.SOFTWARE_ENGINEER;

    render(
      <RoleSelectorOptions
        roles={roles}
        currentRole={currentRole}
        setCurrentRole={mockSetCurrentRole}
      />
    );
  });

  test("Should render correctly with given roles", () => {
    const currentRole: Roles = Roles.SOFTWARE_ENGINEER;
    render(
      <RoleSelectorOptions
        roles={roles}
        currentRole={currentRole}
        setCurrentRole={mockSetCurrentRole}
      />
    );

    roles.forEach((role) => {
      expect(screen.getByText(role)).toBeDefined();
    });
  });

  test("Should call setCurrentRole when a role is clicked", () => {
    const currentRole: Roles = Roles.SOFTWARE_ENGINEER;
    render(
      <RoleSelectorOptions
        roles={roles}
        currentRole={currentRole}
        setCurrentRole={mockSetCurrentRole}
      />
    );

    const roleButton = screen.getByText(Roles.PRODUCT_MANAGER);
    fireEvent.click(roleButton);

    expect(mockSetCurrentRole).toHaveBeenCalledWith(Roles.PRODUCT_MANAGER);
  });
});
