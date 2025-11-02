import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';
import Head from 'next/head';
import AuthProvider from '@/context/authContext';
import Navbar from '@/components/layout/Navbar';
import Navmobile from '@/components/Navmobile';
import Footer from '@/components/Footer';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=375, user-scalable=no, maximum-scale=1.0" />
      </Head>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="block md:hidden">
        <Navmobile />
      </div>
      <div className="app-outer">
        <div className="app-viewport">
          <AuthProvider>
          <Component {...pageProps} />
          </AuthProvider>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
}
