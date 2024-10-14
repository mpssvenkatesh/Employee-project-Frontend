import logo from './logo.svg';
import './App.css';
import Header from './pages/header/Header';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import NoMatch from './pages/noMatch/noMatch'
import Adduser from './pages/employee/AddUser';
import Updateuser from './pages/employee/updateUser';

function App() {
  return (
    <><Header /><Routes>
      <Route path='/' element={<Dashboard/ >}></Route>
      <Route path='/addEmployee' element={<Adduser/ >}></Route>
      <Route path='/employee/:id' element={<Updateuser/ >}></Route>
      <Route path='/' element={<NoMatch/ >}> </Route>
    </Routes>
    </>
  );
}

export default App;
