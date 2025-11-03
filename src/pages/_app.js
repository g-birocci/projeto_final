import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AuthProvider from '@/context/authContext';
import Navbar from '@/components/layout/Navbar';
import HamburgerMenu from '@/components/HamburgerMenu';
import Footer from '@/components/layout/Footer';
import ToastContainer from '@/components/ui/Toast';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isApp = router?.pathname?.startsWith('/app');

  return (
    <>
      {isApp && (
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=no"
          />
        </Head>
      )}

      {isApp ? (
        // ===== Layout APP (simula mobile) =====
        <div className="min-h-dvh flex flex-col bg-white">
          <AuthProvider>
            <Navbar />
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-[400px] h-full bg-white shadow-lg relative flex flex-col">
                <Component {...pageProps} />
                <HamburgerMenu />
                <ToastContainer />
              </div>
            </div>
          </AuthProvider>
        </div>
      ) : (
        // ===== Layout WEB =====
        <div className="min-h-dvh flex flex-col bg-white">
          <AuthProvider>
            <div className="hidden md:block">
              <Navbar />
            </div>
            <main className="flex-1">
              <Component {...pageProps} />
            </main>
            <ToastContainer />
            <Footer />
          </AuthProvider>
        </div>
      )}
    </>
  );
}
