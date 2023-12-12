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
              El lugar y la ocasión de nuestra primera cita es algo que nunca
              voy a olvidar. Gracias a ese bubble tea, tuve la inspiración de
              nombrar este album y me gusta pensar que en ese lugar fue donde
              empezó nuestra historia. <br />
              <br /> Estoy muy feliz de poder compartir lo que resta de mi vida
              con una persona tan maravillosa como vos y espero con ansias de
              vivir todas las aventuras tan increíbles que nos esperan. Es por
              esto que pensé que necesitamos un lugar en donde podamos guardar
              todos nuestros recuerdos como pareja...
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
