import React, { useState, useEffect } from 'react';
import { saveDepts } from '../features/departmentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Cities from './Cities';

function Departments({setSelectedDepartment}) {
    const dispatch = useDispatch();
    const departments = useSelector(state => state.departments.departments);

    const deptms = () => {
        fetch('https://babytracker.develotion.com/departamentos.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'iduser': 49,
                'apikey': 'a834268a4550eaef16ce0125a1c5ba6a'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch(saveDepts(data.departamentos));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        deptms();
    }, []);

    const handleDepartmentChange = (event) => {
        const departmentId = event.target.value;
        setSelectedDepartment(departmentId)
    };

    return (
        <>
            <div>
                <Form.Select size="lg" aria-label="Default select example" onChange={handleDepartmentChange}>
                    <option value="" disabled selected>
                        Selecciona un departamento
                    </option>
                    {departments.map((department) => (
                        <option key={department.id} value={department.id}>
                            {department.nombre}
                        </option>
                    ))}
                </Form.Select>
            </div>
        </>
    );
}

export default Departments;