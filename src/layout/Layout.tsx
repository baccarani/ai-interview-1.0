import { ReactNode } from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
