<<<<<<< HEAD
<<<<<<< Updated upstream
import "@/styles/globals.css";
=======
import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';
import Head from 'next/head';
>>>>>>> Stashed changes
=======
import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';
>>>>>>> main

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=375, user-scalable=no, maximum-scale=1.0" />
      </Head>
      <div className="app-outer">
        <div className="app-viewport">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

