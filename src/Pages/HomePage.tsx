

import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Industries from '../components/Industries';
import Process from '../components/Process';
import Stats from '../components/Stats';
import Jobs from '../components/Jobs';
import Testimonials from '../components/Testimonials';
import Compliance from '../components/Compliance';
import Contact from '../components/Contact';
import Specializations from '../components/specializations';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Industries />
      <Process />
   
      <Jobs />
      <Specializations />
      <Compliance />
      <Contact />
    </>
  );
};

export default HomePage;