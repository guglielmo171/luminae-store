import Navbar from "@/shared/UI/Navbar";
import Footer from "@/shared/UI/Footer";
import { Outlet, useNavigation } from "react-router";
import { Spinner } from "@/components/ui/spinner";

const RootLayout = () => {
    const navigation = useNavigation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {navigation.state === "loading" && <div className="flex items-center justify-center gap-4 py-8">
            <Spinner variant="primary" size="lg" />
          </div>}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout