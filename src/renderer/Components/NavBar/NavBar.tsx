import React from 'react';
import houseIcon from '../../../../assets/icons/house.png';
import tripIcon from '../../../../assets/icons/trip.png';
import froggieIcon from '../../../../assets/icons/froggieIcon.png';
import goalIcon from '../../../../assets/icons/goal.png';
import NavBarBtn from './NavBarBtn';
import '../../Styles/NavBar.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid navContainer">
        <NavBarBtn linkIcon={houseIcon} />
        <NavBarBtn linkIcon={tripIcon} />
        <NavBarBtn linkIcon={froggieIcon} />
        <NavBarBtn linkIcon={goalIcon} />
      </div>
    </nav>
  );
}

export default NavBar;
