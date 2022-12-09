import '../../index.css';
import Header from '../Header/header';
import Promo from '../Main/Promo/promo';
import AboutProject from '../Main/AboutProject/aboutProject';
import Techs from '../Main/Techs/techs';

function App() {
  return (
    <div className="page">

      <Header />

      <Promo />

      <AboutProject />

      <Techs />

    </div>
  );
}

export default App;
