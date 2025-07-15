//Para hacer gráficas
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { useEffect } from 'react'
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

const Grafica1 = () => {

  const listaEventos = useSelector(state => state.states.states);
  const listaCategorias = useSelector(state => state.categories.categories);


  const dispatch = useDispatch();
  const URLBASE = "https://babytracker.develotion.com/";

  const idUser = localStorage.getItem("id");
  const apiKey = localStorage.getItem("apikey");


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

    }, []);
  
    //Calculamos cantidad de eventos de una categoría

    const listaCategoriasTotal = listaCategorias.map(cat => ({
      nombreCategoria: cat.tipo,
      cantidadEventos: listaEventos.filter(ev => ev.idCategoria === cat.id).length
    }));


    // Filtramos categorías sin eventos
    const listaCategoriasGrafica = listaCategoriasTotal.filter(item => item.cantidadEventos > 0);

    return (
                
          <div className='row'>
              <div className='col-12'>
                    <h4>Cantidad de eventos por categoría</h4>
                    <Bar options={{
                        responsive: true,
                        plugins: {
                            legend: {
                            position: 'top',
                            },
                            title: {
                            display: true,
                            text: 'Categorías',
                            },
                        },
                    }} 
                    data={{
                        labels: listaCategoriasGrafica.map(item => item.nombreCategoria),
                        datasets: [
                        {
                            label: 'Eventos por categoría',
                            data: listaCategoriasGrafica.map(item => item.cantidadEventos),
                            backgroundColor: '#669ecb',
                        }
                        ],
                    }} />
                </div>
          </div>
    
    )
}

export default Grafica1