import {Logo3d} from './component/logo/Logo3d.js';
import { CardUser } from './component/cardUser/CardUser.js';
import { Graph } from './component/graph/Graph.js';
import './asset/generic.scss';


function App() {
  return (
    <div className="App">
      <Logo3d />
      <div className='position-relative-for-other-element'>
        {/* <CardUser/> */}
        <Graph/>
      </div>
      
    </div>
  );
}

export default App;
