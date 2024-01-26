import { ModeToggle } from "@/features/theme/ModeToggle";
import Container from "../container/Container";

const Navbar = () => {
  return (
    <nav className="border-b">
      <Container className="flex justify-between items-center p-3 relative">
        <h1 className="font-semibold text-lg">Ai Interviews</h1>

        <ModeToggle />
      </Container>
    </nav>
  );
};

export default Navbar;
