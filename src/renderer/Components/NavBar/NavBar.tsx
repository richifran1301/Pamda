import React from 'react';
import houseIcon from '../../../../assets/icons/house.png';
import froggieIcon from '../../../../assets/icons/froggieIcon.png';
import NavBarBtn from './NavBarBtn';
import '../../Styles/NavBar.css';

interface Props {
  onSelectTab: (tabSelected: string) => void;
  selectedTab: string;
}

function NavBar({ onSelectTab, selectedTab }: Props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
      <div className="container-fluid navContainer">
        <NavBarBtn
          linkIcon={houseIcon}
          identityTab="Home"
          onClickElement={onSelectTab}
          activeClass={selectedTab === 'Home' ? 'activeTab' : ''}
        />
        <NavBarBtn
          linkIcon={froggieIcon}
          identityTab="Froggie"
          onClickElement={onSelectTab}
          activeClass={selectedTab === 'Froggie' ? 'activeTab' : ''}
        />
      </div>
    </nav>
  );
}

export default NavBar;
