import './App.css';
import Layout from './Layout';
import {Routes,Route} from "react-router-dom"
import FrontRunner from './pages/Home/frontrunner';
import Liquidation from './pages/Home/liquidation';
import Longtail from './pages/Home/longtail';
import WholeBlock from './pages/Home/wholeblock';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
       <Layout>
         <Routes>
            <Route exact path='/' element={<Home/>}>
               <Route exact path='frontrunner' element={< FrontRunner/>}/>
               <Route exact path='longtail' element={<Longtail/>}/>
               <Route exact path='wholeblock' element={<WholeBlock/>}/>
           </Route>
         </Routes>
       </Layout>
       
   
    </div>
  );
}

export default App;
