import {Logo3d} from './component/logo/Logo3d.js';
import { CardUser } from './component/cardUser/CardUser.js';
import { Graph } from './component/graph/Graph.js';
import { FormUser } from './component/formUser/FromUser.js';
import { EditUserForm } from './component/editUserForm/EditUserForm.js';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { SelectGame } from './component/selectGame/SelectGame.js';
import { Login } from './component/login/Login.js';



function App() {
  return (
    
    <div className="App">
      <Logo3d />
      <div className='position-relative-for-other-element'>
      <Router>
        <Routes>
          <Route path="/inscription" element={<FormUser />} />
          <Route path="/graph/:id" element={<Graph />} />
          <Route path="/users" element={< CardUser/>} />
          <Route path="/select-game/:id" element={<SelectGame/>} />
          <Route path="/" element={<Login />} />
          <Route path="/form-user" element={<FormUser/>} />
        </Routes>
      </Router>
          {/* <EditUserForm/> */}
        {/* <CardUser/> */}
        {/* <Graph/> */}
        {/* <FormUser/> */}
      </div>
      
    </div>
  );
}

export default App;
