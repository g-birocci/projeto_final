import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';
import Footer  from '@/components/Footer';

export default function App({ Component, pageProps }) {
  return ( 
    <>
      <div className='hidden md:block'>
        <Navbar/>
      </div>
        <Component {...pageProps}/>;
      <div className='block md:hidden'>
        <Footer /> 
      </div>


    </>
  )
  
}

