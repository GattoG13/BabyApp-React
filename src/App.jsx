import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Navigate } from 'react-router-dom';
import Content from './components/Content';
import Menu from './components/Menu';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify';
import { store } from './store/store';
import { Provider } from 'react-redux';


function App() {
  return (
    <Provider store ={store}>
    <BrowserRouter>
    <Menu/>
      <Routes>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='/' element={<Content/>}>
          <Route path='content' element={<Content/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

    
    <ToastContainer />
    </Provider>
  );
}

export default App;
