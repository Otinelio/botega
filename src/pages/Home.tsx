import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import SignatureDishes from '../components/SignatureDishes';
import Experiences from '../components/Experiences';
import Gallery from '../components/Gallery';
import Reservation from '../components/Reservation';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <SignatureDishes />
      <Experiences />
      <Gallery />
      <Reservation />
      <Testimonials />
      <Footer />
    </>
  );
}
