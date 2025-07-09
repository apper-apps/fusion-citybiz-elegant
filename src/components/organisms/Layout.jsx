import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;