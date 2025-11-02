import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AuthProvider from '@/context/authContext';
import Navbar from '@/components/layout/Navbar';
import Navmobile from '@/components/Navmobile';
import Footer from '@/components/layout/Footer';
import ToastContainer from '@/components/ui/Toast';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isApp = router?.pathname?.startsWith('/app');

  return (
    <>
      {isApp && (
        <Head>
          <meta name="viewport" content="width=375, user-scalable=no, maximum-scale=1.0" />
        </Head>
      )}

      {isApp ? (
        <div className="min-h-screen flex flex-col bg-[var(--ecodoa-soft)]">
          <AuthProvider>
            <div className="flex-1 flex justify-center">
              {/* Frame do app: 100% no mobile; em desktop limita a 375px e centraliza */}
              <div className="w-full md:max-w-[375px] md:my-4 md:rounded-xl md:border md:border-[var(--ecodoa-accent)]/30 md:bg-white md:shadow flex flex-col min-h-[calc(100vh-2rem)] md:min-h-[700px]">
                <div className="flex-1">
                  <Component {...pageProps} />
                </div>
                {/* Navegação mobile dentro do frame para respeitar a largura do app */}
                <Navmobile />
                <ToastContainer />
              </div>
            </div>
          </AuthProvider>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col">
          <div className="hidden md:block">
            <Navbar />
          </div>
          <AuthProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </AuthProvider>
          <Footer />
        </div>
      )}
    </>
  );
}