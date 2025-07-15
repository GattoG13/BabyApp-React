import React, { useEffect, useState } from 'react';
import Categories from './Categories'
import {saveStates} from '../features/statesSlice'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

function Add() {

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const selectedCategory = useSelector(state => state.categories.selectedCategory);

  const dateHandler = (event) => {
    const date = event.target.value
    setSelectedDate(date);
  }

  const detailsHandler = (event) => {
    const details = event.target.value
    setSelectedDetails(details);
  }



  const addEvent = () => {
    // getting the date "yyyy-mm-dd hh:mm:ss"
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    // if date field comes null or empty, date will be date now
    const dateToUse = selectedDate ? selectedDate : now;
    
    const nowDate = new Date();
    const selectedDateObj = new Date(dateToUse);

    if (selectedDate && selectedDateObj > nowDate) {
      toast.error("La fecha debe ser anterior o actual");
      return;
    }

    if (!selectedCategory) {
      toast.error("Elija una categoria para su evento!");
      return;
    }

    const event = {
      "idCategoria": selectedCategory, 
      "idUsuario": localStorage.getItem("id"),
      "detalle": selectedDetails,
      "fecha": selectedDate
    }


    fetch('https://babytracker.develotion.com/eventos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: localStorage.getItem("apikey"),
        iduser: localStorage.getItem("id")
      },
      body: JSON.stringify(event),
    })
      .then(response => response.json())
      .then(data => {
          if (data.codigo === 200) {
            console.log(event)
            console.log(data)
            toast.success("Event successfully logged");
          } else {
            toast.error("Error while adding event");
          }
        }
      )
      .catch(error => {
        console.error('Error:', error);
        toast.error('An error occurred while logging a new event');
      });
  };

  return (
    <>
    <div className='agregar'>
      <h2>Agregar un evento</h2>
    <label htmlFor="categories">Categorias</label>
    <br/>
    <Categories/>
    <br/>
    <br/>
    <label htmlFor="details">Detalles del evento: </label>
    <br/>
    <input type="text" placeholder='Detalles' onChange={detailsHandler}/>
    <br/>
    <br/>
    <label htmlFor="date">Fecha: </label>
    <input type="datetime-local" placeholder='Fecha del evento' onChange={dateHandler} />
    <br/>
    <br/>
    <button onClick={addEvent}>Agregar Evento</button>
    </div>
    </>
  )
}

export default Add