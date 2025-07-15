import React from 'react';
import { useSelector } from 'react-redux';

function EventReport() {

    const savedEvents = useSelector(state => state.states.states);
    const categories = useSelector(state => state.categories.categories);

    // get date on format "YYYY-MM-DD"
    const getTodayDate = () => {
        const now = new Date();
        return now.toISOString().slice(0, 10); 
    };

    const today = getTodayDate();

    //get categories by name
    const getCategoryByName = (name) => {
        return categories.find(category => category.tipo === name);
    };
    
    //Se utilizo Inteligencia Artificial (chat GPT) como guia para la realizacion de este codigo por el intenso nivel matematico
    //  function to format time lapsed since last event
    const formatTimeElapsed = (eventDateTime) => {
        const eventTime = new Date(eventDateTime);
        const now = new Date();
        const diffMs = now - eventTime;
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const remainingSecs = diffSecs % 60;
        const remainingMins = diffMins % 60;

        return `${diffHours} horas, ${remainingMins} minutos y ${remainingSecs} segundos`;
    };
        
    // function to calculate total of events made today and time since last event of an specified category
    const calculateTotalsAndLastEvent = (categoryName) => {
        const category = getCategoryByName(categoryName);
        if (!category) return { total: 0, lastEventTime: 'No disponible' };

        // filter events of today that matches the id and todays date
        const todayEvents = savedEvents
            .filter(event => event.idCategoria === category.id && event.fecha.startsWith(today));

        const total = todayEvents.length;

        // we find the last event with the last-date
        const lastEvent = todayEvents.reduce((latest, event) => {
            return new Date(event.fecha) > new Date(latest.fecha) ? event : latest;
        }, { fecha: '1990-01-01T00:00:00'});

        const lastEventTime = total > 0 ? formatTimeElapsed(lastEvent.fecha) : 'No disponible';

        return { total, lastEventTime };
    };

    
    const { total: totalBiberones, lastEventTime: lastBiberonTime } = calculateTotalsAndLastEvent('Biberón');
    const { total: totalPañales, lastEventTime: lastPañalTime } = calculateTotalsAndLastEvent('Pañal');

    return (
        <>
        <div className='eventsList'>
            <h2>Informe de Eventos</h2>
            <div>
                <h3>Biberones</h3>
                <p>Total ingeridos hoy: {totalBiberones}</p>
                <p>Tiempo desde el último biberón: {lastBiberonTime}</p>
            </div>
            <div>
                <h3>Pañales</h3>
                <p>Total cambiados hoy: {totalPañales}</p>
                <p>Tiempo desde el último cambio de pañal: {lastPañalTime}</p>
            </div>
        </div>
        </>
    );
}

export default EventReport;