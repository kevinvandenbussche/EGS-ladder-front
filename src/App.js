import {Logo3d} from './component/logo/Logo3d.js';
import { CardUser } from './component/cardUser/CardUser.js';
import { Graph } from './component/graph/Graph.js';
import { FormUser } from './component/formUser/FromUser.js';
import { EditUserForm } from './component/editUserForm/EditUserForm.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SelectGame } from './component/selectGame/SelectGame.js';
import { Login } from './component/login/Login.js';
import './asset/_generic.scss';


function App() {
  return (
    
    <div className="App">
      <Logo3d />
      <div className='position-relative-for-other-element'>
      <Router>
        <Routes>
          <Route path="/inscription" element={<FormUser />} />
          <Route path="/graph/:id" element={<Graph />} />
          <Route path="/user-management" element={< CardUser/>} />
          <Route path="/select-game/:id" element={<SelectGame/>} />
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<FormUser/>} />
        </Routes>
      </Router>
      </div>
      
    </div>
  );
}

export default App;
