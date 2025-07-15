import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveCity } from '../features/citiesSlice';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';

function Cities({ selectedDepartment, setSelectedCity }) {
    const dispatch = useDispatch();
    const citiesSaved = useSelector(state => state.cities.cities);

    const cities = (selectedDepartment) => {
        fetch(`https://babytracker.develotion.com/ciudades.php?idDepartamento=${selectedDepartment}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch(saveCity(data.ciudades))
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        cities(selectedDepartment);
    }, [selectedDepartment]);

    const handleCityChange = (event) => {
        const cityId = event.target.value;
        setSelectedCity(cityId)
    };
  return (
    <div>
    <Form.Select size="sm" name="cities" id="cities" onChange={handleCityChange}>
        {citiesSaved.length > 0 ? (
            citiesSaved.map((city) => (
                <option key={city.id} value={city.id}>
                    {city.nombre}
                </option>
            ))
        ) : (
            <option value="">Seleccione un departamento para su ciudad</option>
        )}
    </Form.Select>
</div>

  )
}

export default Cities