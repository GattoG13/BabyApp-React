import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Add from './Add';
import Events from './Events';
import EventReport from './EventReport';
import NextBiberon from './NextBiberon';
import Grafica1 from "./Grafica1";
import Grafica2 from "./Grafica2";
import logo from '../imgs/iconApp.png'

function Content() {
  const navigate = useNavigate();
  const user = localStorage.getItem("id");

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
    <div className="w-100 p-0"> {/* Eliminé "container" aquí */}
      <div className="container mt-4"> {/* Contenedor interno con margen */}
        <div className="row">
          <div className="col-12" id="contenido">
            <div className="row">
              <div className="col-6">
                <Add />
                <Events />
              </div>
              <div className="col-6">
                <EventReport />
                <NextBiberon />
                <Grafica1 />
                <Grafica2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <footer className="bg-light text-center text-lg-start w-100 p-0 mt-5 ">
      <div id="piePagina" className="p-0 py-5"> {/* Contenedor centrado dentro del footer */}
        <div className="row d-flex align-items-center">
          <div className="col-md-4 text-center mb-4 mb-md-0">
            <img src={logo} alt="logoApp" id="piePagina1" />
          </div>
  
          <div className="col-md-4 text-center">
            <p>© 2024 BabyApp</p>
          </div>
  
          <div className="col-md-4 text-center mb-4 mb-md-0">
            <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Ir arriba
            </button>
          </div>
        </div>
      </div>
    </footer>
  </>
  

  );
}

export default Content;
