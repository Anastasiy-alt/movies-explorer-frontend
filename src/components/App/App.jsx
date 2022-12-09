import '../../index.css';
import Header from '../Header/header';
import Promo from '../Main/Promo/promo';
import AboutProject from '../Main/AboutProject/aboutProject';
import Techs from '../Main/Techs/techs';
import AboutMe from '../Main/AboutMe/aboutMe';
import Footer from '../Footer/footer';

function App() {
  return (
    <div className="page">

      <Header />

      <Promo />

      <AboutProject />

      <Techs />

      <AboutMe />

      <Footer />

    </div>
  );
}

export default App;
