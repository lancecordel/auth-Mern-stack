// import { Route, Routes } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import Electronics from './components/Electronics';
import Jewelry from './components/Jewelry';
import Mens from './components/Mens';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import Womens from './components/Womens';
import Item from './components/Item';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';
import SearchResults from './components/SearchResults';


function App() {
  const user = false;
  return (
    <BrowserRouter>
        <div className="App">
     <Navbar  />   
      <div>
      <Routes>
       <Route  path='/' element={ <Slider /> } />
       <Route  path="/categories/:product" element={ <Item /> } />
       <Route  path='/categories' element={ <Categories /> } />
       <Route  path='/categories/mens' element={ <Mens/> } />
        <Route  path='/categories/womens' element={ <Womens/> } />
        <Route  path='/categories/Jewelry' element={ <Jewelry/> } />
        <Route  path='/categories/electronics' element={ <Electronics/> } />
        <Route  path='/users/register' element={ user? <Slider/> : <Register/> } />
        <Route  path='/authorize/login' element={ user? <Slider/> : <Login/> } />
        <Route  path='/items' element={ <Admin/> } />
        {/* <Route  path='/results' element={ <SearchResults/> } /> */}
     </Routes>
      </div>
    </div>
    </BrowserRouter>

  );
}

export default App;
