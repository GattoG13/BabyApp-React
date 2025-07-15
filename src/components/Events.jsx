import React, {  useEffect } from 'react';
import { saveStates, deletesEvent } from '../features/statesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Events() {
    const dispatch = useDispatch();
    const idUser = localStorage.getItem("id");
    const savedEvents = useSelector(state => state.states.states);
    const categories = useSelector(state => state.categories.categories);
    

    const getCategoryInfo = (categoryId) => {
      return categories.find(cat => cat.id === categoryId) || {};
  };

  const deleteEvent = (eventId) => {
    fetch(`https://babytracker.develotion.com/eventos.php?idEvento=${eventId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            iduser: localStorage.getItem("id"),
            apikey: localStorage.getItem("apikey")
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.codigo === 200) {
                console.log(data)
                dispatch(deletesEvent(eventId));
                toast.success("Evento eliminado con exito");
            } else {
                console.error("Error al eliminar el evento.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
};
    const fetchEvents = () => {
        fetch(`https://babytracker.develotion.com/eventos.php?idUsuario=${idUser}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            apikey: localStorage.getItem("apikey"),
            iduser: idUser
          }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(saveStates(data.eventos));
        })
        .catch(error => {
            console.error('Error:', error);
        });
      };

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

    const eventsToday = savedEvents.filter(event => event.fecha.startsWith(today));
    const eventsPast = savedEvents.filter(event => event.fecha < today);
    

    return (
        <>
        <div>
          <div className='eventsList'>
            <h2>Eventos de Hoy</h2>
            <ul className="list-unstyled">
              {eventsToday.length > 0 ? (
                eventsToday.map((event) => {
                  const categoryInfo = getCategoryInfo(event.idCategoria);
                  return (
                    <li key={event.id} className="border rounded p-3 mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <img
                          src={"https://babytracker.develotion.com/imgs/"+ categoryInfo.imagen+".png"}
                          alt={categoryInfo.tipo}
                          style={{ width: '30px', height: '30px', marginRight: '10px' }}
                        />
                        <div>
                          <strong>Detalles:</strong> {event.detalle || 'No disponible'} <br />
                          <strong>Fecha:</strong> {event.fecha} <br />
                          <strong>Categoría:</strong> {categoryInfo.tipo}
                        </div>
                      </div>
                      <button className="btn btn-danger" onClick={() => deleteEvent(event.id)}>
                        Eliminar
                      </button>
                    </li>
                  );
                })
              ) : (
                <p>No hay eventos para hoy</p>
              )}
            </ul>
          </div>
          <div className='eventsList'>
            <h2>Eventos Anteriores</h2>
            <ul className="list-unstyled">
              {eventsPast.length > 0 ? (
                eventsPast.map((event) => {
                  const categoryInfo = getCategoryInfo(event.idCategoria);
                  return (
                    <li key={event.id} className="border rounded p-3 mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <img
                          src={"https://babytracker.develotion.com/imgs/"+ categoryInfo.imagen+".png"}
                          alt={categoryInfo.tipo}
                          style={{ width: '30px', height: '30px', marginRight: '10px' }}
                        />
                        <div>
                          <strong>Detalles:</strong> {event.detalle || 'No disponible'} <br />
                          <strong>Fecha:</strong> {event.fecha || 'No disponible'} <br />
                          <strong>Categoría:</strong> {categoryInfo.tipo}
                        </div>
                      </div>
                      <button className="btn btn-danger" onClick={() => deleteEvent(event.id)}>
                        Eliminar
                      </button>
                    </li>
                  );
                })
              ) : (
                <p>No hay eventos anteriores para mostrar</p>
              )}
            </ul>
          </div>
        </div>
      </>
      
  );
}

export default Events