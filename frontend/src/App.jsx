import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layouts/Layout"
import Menu from "./pages/Menu"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Feedback from "./pages/Feedback";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<Layout />}>
          <Route path="/" element={<Menu />} />        {/* default */}
          <Route path="/menu" element={<Menu />} />    {/* 👈 add this */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />


        </Route>
      </Routes>
    </BrowserRouter>
  )
}
