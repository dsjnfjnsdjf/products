import  {  useState, createContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Orders from './pages/Orders'
import Products from './pages/Products'
import Register from './pages/Register'
import Login from './pages/Login'
import Checkout from './pages/Chekout'
import Error from './pages/ErrorPage'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductsDetail'

export const UserContext = createContext('');
export const TokenContext = createContext('');
export const ThemeContext = createContext('');

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
    if (localStorage.getItem('theme')) {
      document.querySelector('html').setAttribute('data-theme' , localStorage.getItem('theme'));
    }
  }, [])

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <TokenContext.Provider value={{ token, setToken }}>
      <ThemeContext.Provider value={{theme , setTheme}}>
      <Routes>
        <Route path='/' element={<MainLayout><Home></Home></MainLayout>}></Route>
        <Route path='/products' element={<MainLayout><Products></Products></MainLayout>}></Route>
        <Route path="/product/:id" element={<MainLayout><ProductDetails  addToCart={addToCart} /></MainLayout>}></Route>
        
        <Route path='/cart' element={<MainLayout><Cart cartItems={cartItems} removeFromCart={removeFromCart}></Cart></MainLayout>}></Route>

        <Route path='/about' element={<MainLayout><About></About></MainLayout>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='*' element={<Error></Error>}></Route>
        {
          token && <>
            <Route path='/orders' element={<MainLayout><Orders></Orders></MainLayout>}></Route>
            <Route path='/chekout' element={<MainLayout><Checkout></Checkout></MainLayout>}></Route>
          </>
        }
      </Routes>
      </ThemeContext.Provider>
        </TokenContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

export default App
