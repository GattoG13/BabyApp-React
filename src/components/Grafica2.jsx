//Para hacer gráficas
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement} from 'chart.js';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveStates } from '../features/statesSlice';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement, 
    LineElement
);


const GraficaComidasSemana = () => {

  const listaEventos = useSelector(state => state.states.states);
  console.log("Lista eventos: ", listaEventos)  //----BORRAR

  const dispatch = useDispatch();

  const URLBASE = "https://babytracker.develotion.com/";

  const idUser = localStorage.getItem("id");
  const apiKey = localStorage.getItem("apikey");
  console.log("ApiKey: ", apiKey); //-----------------------BORRAR
  console.log("IdUser: ", idUser) //-----------------------BORRAR

  useEffect(() => {
    
    fetch(`${URLBASE}eventos.php?idUsuario=${idUser}`, { 
      method: 'GET', 
      headers: {
          'Content-Type': 'application/json',
          apikey: apiKey,
          iduser: idUser
      }
    })
    .then(response => response.json())
    .then(data => {
      dispatch(saveStates(data.eventos));
    })
    
  }, [dispatch]);    //VER SI QUEDA

  
const fechaActual = new Date();
const sieteDias = [];

//Con asistencia de chatGPT para obtener los 7 días: 
// Generamos las fechas de los últimos 7 días, comenzando por la fecha más antigua
for (let i = 6; i >= 0; i--) {
    const fecha = new Date(fechaActual); // Creamos una nueva instancia de la fecha actual
    fecha.setDate(fechaActual.getDate() - i); // Restamos 'i' días
    const año = fecha.getFullYear(); // Obtenemos el año
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Obtenemos el mes, y añadimos un '0' si es necesario
    const dia = String(fecha.getDate()).padStart(2, '0'); // Obtenemos el día, y añadimos un '0' si es necesario
    const fechaFormateada = `${año}-${mes}-${dia}`; // Formateamos la fecha como AAAA-MM-DD
    sieteDias.push(fechaFormateada); // Añadimos la fecha al array
}

  // Filtramos los eventos por los 7 días y contamos cuántas comidas se realizaron cada día
  const comidasPorDia = sieteDias.map(c => {  //Iteramos los 7 días
    return listaEventos.filter(ev => ev.fecha.startsWith(c) 
                                     && ev.idCategoria === 31).length; //Eventos de cada día
  });                                                      //31 idCategoria Comidas hardcodeado

  return (

    <div className='row'>
        < div className='col-12'>
            <h4>Comidas de los últimos 7 días</h4>
            <Bar options={{
                responsive: true,
                plugins: {
                    legend: {
                    position: 'top',
                    },
                    title: {
                    display: true,
                    text: 'Comidas por día',
                    },
                },
                }}
                data={{
                labels: sieteDias,
                datasets: [
                    {
                    label: 'Comidas',
                    data: comidasPorDia,
                    backgroundColor: '#669ecb',
                    }
                ],
            }} />
            </div>
      </div>

  )
}

export default GraficaComidasSemana;
