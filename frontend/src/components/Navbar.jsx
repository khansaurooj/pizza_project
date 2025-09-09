
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";

import {ShoppingCart} from "lucide-react";

const linkBase =
"px-3 py-2 rounded-xl transition text-white hover:bg-white/10"; // default look

export default function Navbar(){
    return(
        <header className="sticky top-0 z-50 backdrop-blur bg-black/80 border-b">
            <div className="container h-16 flex items-center justify-between">
                <Link to="/menu" className="font-bold text-gray-300" >Pizzario</Link>
                <nav>
                    <NavLink to="/menu" className={({isActive}) => `${linkBase} ${isActive?'bg-black font-semibold':''}`}>Menu</NavLink>
                    <NavLink to="/faq"  className={({ isActive }) =>`${linkBase} ${isActive ? 'bg-black font-semibold shadow-sm'  : ""}` }>FAQ </NavLink>
                    <NavLink to="/contact" className={({ isActive }) =>`${linkBase} ${isActive ? 'bg-black font-semibold shadow-sm' : ""}` } >Contact</NavLink>
                    <NavLink to="/login" className={({isActive}) => `${linkBase} ${isActive?'bg-black font-semibold':''}`}>Login</NavLink>
                    <NavLink to="/register" className= {({isActive}) => `${linkBase} ${isActive?'bg-black font-semibold':''}`}>Register</NavLink>
                    <NavLink to="/cart" className={({isActive}) => `${linkBase} ${isActive?'bg-black font-semibold':''}`}>
                    <span className="inline-flex items-center gap-2"><ShoppingCart size={18}/> Cart</span>
                    </NavLink>

                </nav>

            </div>
        </header>
    );
}