import '../../index.css';
import Header from '../Header/header';
import Promo from '../Main/Promo/promo';
import AboutProject from '../Main/AboutProject/aboutProject';
import Techs from '../Main/Techs/techs';
import AboutMe from '../Main/AboutMe/aboutMe';
import Footer from '../Footer/footer';
import Preloader from '../Movies/Preloader/Preloader';

function App() {
  return (
    <div className="page">

      <Header />

      <Preloader />

      {/* <Promo />

      <AboutProject />

      <Techs />

      <AboutMe />

      <Footer /> */}

    </div>
  );
}

export default App;
