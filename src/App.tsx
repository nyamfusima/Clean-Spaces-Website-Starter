import { About } from './components/About';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Inspiration } from './components/Inspiration';
import { Philosophy } from './components/Philosophy';
import { Process } from './components/Process';
import { ProjectGallery } from './components/ProjectGallery';
import { ProjectVideos } from './components/ProjectVideos';
import { Services } from './components/Services';
import { WhatsAppButton } from './components/WhatsAppButton';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <ProjectGallery />
        <ProjectVideos />
        <Philosophy />
        <Process />
        <Inspiration />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
