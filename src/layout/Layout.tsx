import { ReactNode } from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 bg-background px-6">
        <Navbar />
      </header>
      <main className="grow px-6 pb-6">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
