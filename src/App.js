import {Logo3d} from './component/logo/Logo3d.js';
import { CardUser } from './component/cardUser/CardUser.js';
import { Graph } from './component/graph/Graph.js';
import { FormUser } from './component/formUser/FromUser.js';
import './asset/_generic.scss';


function App() {
  return (
    <div className="App">
      <Logo3d />
      <div className='position-relative-for-other-element'>
        <CardUser/>
        {/* <Graph/> */}
        {/* <FormUser/> */}
      </div>
      
    </div>
  );
}

export default App;
