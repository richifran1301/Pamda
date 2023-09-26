import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Global from 'utils/global';
import NavBar from './Components/NavBar/NavBar';
import HomeTab from './Components/Home/Home';
import SectionHeader from './Components/Utils/SectionHeader';
import UploadModal from './Components/Utils/UploadModal';
import UploadBtn from './Components/Utils/UploadBtn';
import 'bootstrap/dist/css/bootstrap.css';

function MainProgram() {
  const [selectedTab, setSelectedTab] = useState('Home');
  const [showModal, setShowModal] = useState(false);

  const handleTabClick = (tabSelected: string) => {
    setSelectedTab(tabSelected);
  };

  const showSelectedTab = () => {
    switch (selectedTab) {
      case 'Home':
        return <HomeTab />;
      case Global.FROGGIE_TAB:
        return (
          <>
            <SectionHeader title="Fotos de nosotros">
              <p>Lorem ipsum</p>
            </SectionHeader>
            <UploadModal
              modalTitle="Subir foto"
              show={showModal}
              onHide={() => setShowModal(false)}
              currentTab={selectedTab}
            />
            <UploadBtn showModal={() => setShowModal(true)} />
          </>
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
