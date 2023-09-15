import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import HomeTab from './Components/Home/Home';
import SectionHeader from './Components/Utils/SectionHeader';
import 'bootstrap/dist/css/bootstrap.css';

function MainProgram() {
  const [selectedTab, setSelectedTab] = useState('Home');

  const handleTabClick = (tabSelected: string) => {
    setSelectedTab(tabSelected);
  };

  const showSelectedTab = () => {
    switch (selectedTab) {
      case 'Home':
        return <HomeTab />;
      default:
        return <SectionHeader title="Fotos de nosotros" />;
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
