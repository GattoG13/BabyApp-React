import React, { useState} from 'react'
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import Departments from './Departments'
import Cities from './Cities'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveUser } from '../features/usersSlice';
import { Link } from 'react-router-dom';


function Register() {

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [selectedPassword, setSelectedPassword] = useState(null);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const userNameHandler = (event) => {
    const userName = event.target.value
    setSelectedUserName(userName);
  }

  const passwordHandler = (event) => {
    const password = event.target.value
    setSelectedPassword(password);
  }

  const user = {
    "usuario": selectedUserName,
    "password": selectedPassword,
    "idDepartamento": selectedDepartment,
    "idCiudad": selectedCity
  }

  const register = () => {{
      fetch(`https://babytracker.develotion.com/usuarios.php`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
      })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            if(!selectedUserName || !selectedPassword || !selectedDepartment || !selectedCity){
              toast.error("Los campos no pueden estar vacios")
            } else {
              if(data.codigo == 200){
                localStorage.setItem('apikey', data.apiKey);
                localStorage.setItem('id', data.id);
                navigate("/content")
                toast.success("Usuario registrado de manera exitosa");
                dispatch(saveUser(data))
              } else {
                toast.error("Nombre de usuario y contraseña inválidos y/o ya registrados")
              }
            }
          })
          .catch(error => {
              console.error('Error:', error);
          });
  }}



  return (
    <div className='agregar'>
        <label >Register</label>
        <br/>
        <br/>
        <input type="text" placeholder='Enter Your Username' onChange={userNameHandler}></input>
        <br/>
        <br/>
        <input type="password" placeholder='Enter Your Password' onChange={passwordHandler}></input>
        <br/>
        <br/>
        <Departments setSelectedDepartment={setSelectedDepartment} />
        <Cities selectedDepartment={selectedDepartment} setSelectedCity={setSelectedCity}/>
        <br/>
        <button onClick={register}>Register</button> 
        <br/>
        <br/>
        <Link to="/login">You already have an account? Log in</Link>
    </div>
  )
}

export default Register