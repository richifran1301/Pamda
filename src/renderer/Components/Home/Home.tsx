import React from 'react';
import homeIcon from '../../../../assets/icons/homeIcon.jpg';
import '../../Styles/Home.css';

function Home() {
  return (
    <div className="container my-5">
      <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
        <div className="p-3 p-lg-5 pt-lg-3 homeContent">
          <div className="col-md-8">
            <h1 className="display-4 fw-bold lh-1">Pamda</h1>
            <p className="lead">
              Quickly design and customize responsive mobile-first sites with
              Bootstrap, the world’s most popular front-end open source toolkit,
              featuring Sass variables and mixins, responsive grid system,
              extensive prebuilt component s, and powerful JavaScript plugins.
            </p>
          </div>
          <div>
            <img className="" src={homeIcon} alt="" height="300px" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
