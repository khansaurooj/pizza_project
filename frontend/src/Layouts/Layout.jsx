// //sticky navbar
// import { Outlet } from "react-router-dom";
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// export default function Layout()
// {
//     return(
//         <div className="min-h-screen flex flex-col bg-gray-50">
//         <Navbar/>
//         <main className="flex-1">
//             <div className="container py-6">
//                 <Outlet/>
//             </div>
//         </main>
//             <Footer/>
//         </div>
//     );
// }







import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function Layout() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
