import { ModeToggle } from "@/features/theme/ModeToggle";
import Container from "../container/Container";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between items-center py-1.5 mt-3 mb-2.5 relative">
        <Link to="/">
          <h1 className="font-semibold text-lg">AI Interview</h1>
        </Link>

        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
