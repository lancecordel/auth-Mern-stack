// import { Route, Routes } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import Electronics from './components/Electronics';
import Jewelry from './components/Jewelry';
import Mens from './components/Mens';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import Home from './screen/Home';
import Womens from './components/Womens';


function App() {
  return (
    <div className="App">
     <Navbar  />   
      <div>
      <Routes>
       <Route  path='/' element={ <Slider /> } />
       <Route  path='/categories' element={ <Categories /> } />
       <Route  path='/categories/mens' element={ <Mens/> } />
        <Route  path='/categories/womens' element={ <Womens/> } />
        <Route  path='/categories/Jewelry' element={ <Jewelry/> } />
        <Route  path='/categories/electronics' element={ <Electronics/> } />
     </Routes>
      </div>
    </div>
  );
}

export default App;
