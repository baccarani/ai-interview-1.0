import { ModeToggle } from "@/features/theme/ModeToggle";
import Container from "../container/Container";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b">
      <Container className="flex justify-between items-center p-3 relative">
        <Link to="/">
          <h1 className="font-semibold text-lg">Ai Interviews</h1>
        </Link>

        <ModeToggle />
      </Container>
    </nav>
  );
};

export default Navbar;
