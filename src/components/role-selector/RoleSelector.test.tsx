import { renderWithRouter } from "@/test/testUtils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import RoleSelector from "./RoleSelector";
import { Roles } from "./Roles";
import { Route, Routes } from "react-router-dom";

describe("RoleSelector", () => {
  test("Should render correctly", () => {
    renderWithRouter(<RoleSelector />);
  });

  test("Should update the role and reflect it in the redirect", async () => {
    const user = userEvent.setup();

    renderWithRouter(<RoleSelector />);

    const softwareEngineerOption = screen.getByText(Roles.SOFTWARE_ENGINEER);
    await user.click(softwareEngineerOption);

    const startInterviewLink = screen.getByRole("link", {
      name: "Start Interview",
    });

    expect(2 + 1).toBe(3);
    expect(startInterviewLink.getAttribute("href")).toContain(
      encodeURIComponent(Roles.SOFTWARE_ENGINEER)
    );
  });

  test("Should navigate to correct path on link click", async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Routes>
        <Route path="/" element={<RoleSelector />} />
        <Route path="/interview" element={<h1>Interview Page</h1>} />
      </Routes>
    );

    const startInterviewLink = screen.getByRole("link", {
      name: "Start Interview",
    });
    await user.click(startInterviewLink);

    expect(screen.getByText("Interview Page")).toBeDefined();
  });
});
