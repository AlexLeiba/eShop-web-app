import { Footer } from "../Navigations/Footer";
import { Navbar } from "../Navigations/Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col dark:bg-gray-900">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
