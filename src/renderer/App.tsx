import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Global from 'utils/global';
import { Singleton, froggie } from 'utils/singleton';
import NavBar from './Components/NavBar/NavBar';
import HomeTab from './Components/Home/Home';
import SectionHeader from './Components/Utils/SectionHeader';
import UploadModal from './Components/Utils/UploadModal';
import UploadBtn from './Components/Utils/UploadBtn';
import AlbumGrid from './Components/Utils/AlbumGrid';
import 'bootstrap/dist/css/bootstrap.css';

function MainProgram() {
  const [selectedTab, setSelectedTab] = useState('Home');
  const [showModal, setShowModal] = useState(false);
  const [froggiePhotoList, setFroggiePhotoList] = useState(
    Singleton.getFroggieImages()
  );

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
            <SectionHeader title="Nuestras fotos">
              <p className="header-msg">
                Aquí vamos a colocar las fotos que más nos gusten, de todos los
                momentos que queramos recordar. Fotos como: de nosotros, amigos,
                lugares, mascotas, objetos random, etc., irán acá. Este va a ser
                un buen lugar en el que siempre podamos recordar nuestra
                historia y cuando hemos crecido como personas y como pareja.
              </p>
            </SectionHeader>
            <UploadModal
              modalTitle="Subir foto"
              show={showModal}
              onHide={() => setShowModal(false)}
              currentTab={selectedTab}
              handleUpdatePhotoList={(newList: Array<froggie>) =>
                setFroggiePhotoList(newList)
              }
            />
            <AlbumGrid
              photoList={froggiePhotoList}
              onUpdatePhotoList={(newList: Array<froggie>) =>
                setFroggiePhotoList(newList)
              }
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
