import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function NextBottle() {
    const events = useSelector(state => state.states.states);
    const categories = useSelector(state => state.categories.categories);

    const [nextBottleTime, setNextBottleTime] = useState({ time: '', color: '' });

    useEffect(() => {
        // Encuentra el ID de la categoría para biberones
        const bottleCategory = categories.find(cat => cat.tipo === 'Biberón');
        if (!bottleCategory) {
            setNextBottleTime({ time: 'Categoría de biberón no encontrada', color: 'black' });
            return;
        }

        // Filtra los eventos de biberón usando el ID de la categoría
        const bottleEvents = events.filter(event => event.idCategoria === bottleCategory.id);
        if (bottleEvents.length === 0) {
            setNextBottleTime({ time: 'No hay eventos de biberón registrados', color: 'black' });
            return; // Salida temprana si no hay eventos de biberón
        }
        
        //Se utilizo Inteligencia Artificial (chat GPT) como guia para la realizacion de este codigo por el intenso nivel matematico
        bottleEvents.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        const lastBottleDate = new Date(bottleEvents[0].fecha);
        const nextBottleDue = new Date(lastBottleDate.getTime() + 4 * 3600000); // 4 horas después del último biberón
        const now = new Date();
        const timeLeft = nextBottleDue - now;

        //Se utilizo Inteligencia Artificial (chat GPT) como guia para la realizacion de este codigo por el intenso nivel matematico
        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / 3600000);
            const minutes = Math.floor((timeLeft % 3600000) / 60000);
            const seconds = Math.floor((timeLeft % 60000) / 1000);
            setNextBottleTime({ time: `${hours}h ${minutes}m ${seconds}s`, color: 'green' });
        } else {
            const overdue = -timeLeft;
            const hours = Math.floor(overdue / 3600000);
            const minutes = Math.floor((overdue % 3600000) / 60000);
            const seconds = Math.floor((overdue % 60000) / 1000);
            if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
                console.error("Error calculating time: ", { hours, minutes, seconds, overdue, timeLeft });
                setNextBottleTime({ time: 'Error en el cálculo del tiempo', color: 'red' });
            } else {
                setNextBottleTime({ time: `Excedido por ${hours}h ${minutes}m ${seconds}s`, color: 'red' });
            }
        }
    }, [events, categories]);

    return (
        <div className="eventsList">
            <h2>Próximo Biberón</h2>
            <p style={{ color: nextBottleTime.color }}>
                Tiempo restante: {nextBottleTime.time}
            </p>
        </div>
    );
}

export default NextBottle;
