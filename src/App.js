// import { Route, Routes } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import Home from './screen/Home';


function App() {
  return (
    <div className="App">
     <Navbar  />    
      {/* <Slider /> */}
      <div>
      <Routes>
       <Route  path='/' element={ <Slider /> } />
       <Route  path='/categories' element={ <Categories /> } />
     </Routes>
      </div>
    </div>
  );
}

export default App;
