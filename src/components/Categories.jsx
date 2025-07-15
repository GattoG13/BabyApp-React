import React, { useState, useEffect } from 'react';
import {saveCategories, selectCategory} from '../features/categoriesSlice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

function Categories() {
    const dispatch = useDispatch();
    const categoriesSaved = useSelector(state => state.categories.categories);
    const selectedCategory = useSelector(state => state.categories.selectedCategory);
    

    const id = localStorage.getItem("id");
    const apikey = localStorage.getItem("apikey");
    const fetchCategories = () =>{
        fetch('https://babytracker.develotion.com/categorias.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                apikey: apikey,
                iduser: id
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch(saveCategories(data.categorias));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        dispatch(selectCategory(categoryId)); 
    };

  return (
      <select size="lg" aria-label="Default select example" onChange={handleCategoryChange}>
          <option value="">Selecciona una categoria</option>
          {Array.isArray(categoriesSaved) && categoriesSaved.length > 0 ? (
              categoriesSaved.map((category) => (
                  <option key={category.id} value={category.id}>
                      {category.tipo}
                  </option>
              ))
          ) : (
              <option value="">No hay categorías disponibles</option>
          )}
      </select>
  )
}

export default Categories