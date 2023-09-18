import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Singleton from 'utils/singleton';
import NavBar from './Components/NavBar/NavBar';
import HomeTab from './Components/Home/Home';
import SectionHeader from './Components/Utils/SectionHeader';
import 'bootstrap/dist/css/bootstrap.css';

function MainProgram() {
  const [selectedTab, setSelectedTab] = useState('Home');

  const handleTabClick = (tabSelected: string) => {
    setSelectedTab(tabSelected);
    console.log(Singleton.dataObject);
  };

  const showSelectedTab = () => {
    switch (selectedTab) {
      case 'Home':
        return <HomeTab />;
      case 'Froggie':
        return (
          <SectionHeader title="Fotos de nosotros">
            <p>Lorem ipsum</p>
          </SectionHeader>
        );
      default:
        return (
          <SectionHeader title="Sección no implementada">
            <p>Hola Mundo</p>
          </SectionHeader>
        );
    }
  };

  return (
    <div id="mainDiv">
      <NavBar onSelectTab={handleTabClick} selectedTab={selectedTab} />
      {showSelectedTab()}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainProgram />} />
      </Routes>
    </Router>
  );
}
