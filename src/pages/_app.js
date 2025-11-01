<<<<<<< HEAD
import Navbar from "@/components/Navbar";
import Navmobile from "@/components/Navmobile";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import "leaflet/dist/leaflet.css";
=======
import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';
import Head from 'next/head';
>>>>>>> main

export default function App({ Component, pageProps }) {
  return (
    <>
<<<<<<< HEAD
      <div className="hidden md:block">
        <Navbar />
      </div>
        <Component {...pageProps} />
      <div className="md:hidden">
        <Navmobile />
      </div>
        <Footer />
=======
      <Head>
        <meta name="viewport" content="width=375, user-scalable=no, maximum-scale=1.0" />
      </Head>
      <div className="app-outer">
        <div className="app-viewport">
          <Component {...pageProps} />
        </div>
      </div>
>>>>>>> main
    </>
  );
}
