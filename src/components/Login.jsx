import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Login() {

  const [selectedUserName, setSelectedUserName] = useState(null);
  const [selectedPassword, setSelectedPassword] = useState(null);

  const navigate = useNavigate()

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
    "password": selectedPassword
  }

  const login = () => {
    fetch('https://babytracker.develotion.com/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        if (!selectedUserName || !selectedPassword) {
          toast.error("Username and/or password cannot be empty");
          return;
        }
        if (data.codigo === 200) {
          localStorage.setItem('apikey', data.apiKey);
          localStorage.setItem('id', data.id);
          navigate("/content");
          toast.success("User successfully logged in");
        } else {
          toast.error("Invalid Username and/or password");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('An error occurred while logging in');
      });
  };
  



  return (
    <div className='agregar'>
        <label >Login</label>
        <br/>
        <br/>
        <input type="text" placeholder='Enter Your Username' onChange={userNameHandler}></input>
        <br/>
        <br/>
        <input type="password" placeholder='Enter Your Password' onChange={passwordHandler}></input>
        <button onClick={login}>Log in</button>
        <br/>
        <br/>
        <Link to="/register">You dont have an account? Register for free</Link>
    </div>
  )
}

export default Login