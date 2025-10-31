import Navbar from "@/components/Navbar";
import Navmobile from "@/components/Navmobile";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import "leaflet/dist/leaflet.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
        <Component {...pageProps} />
      <div className="md:hidden">
        <Navmobile />
      </div>
        <Footer />
    </>
  );
}
