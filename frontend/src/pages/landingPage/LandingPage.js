import { ThemeProvider } from "styled-components";
import { light, dark } from "./styles/Themes";
import { Navigation, Footer, ScrollToTop } from "./components";
import {
  Faq,
} from "./components/sections";
import Mixo from "./components/Mixo/Mixo";
import GlobalStyles from "./styles/GlobalStyles";

function LandingPage() {
  window.location.replace('/app');

  return (
    <>
    
      <GlobalStyles />
      <ThemeProvider theme={light}>
        <Navigation />
        {/* <Home /> */}
        {/* <About /> */}
        {/* <Roadmap /> */}
        {/* <Showcase /> */}
        {/* <Team /> */}
        <Mixo/>
        {/* <Faq /> */}
        <Footer />
        <ScrollToTop />
      </ThemeProvider>
    </>
  );
}

export default LandingPage;


