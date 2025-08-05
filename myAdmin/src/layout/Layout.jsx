import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import Pages from '../routes/routes.jsx'

const Layout =()=>{
    return(
  <BrowserRouter> {/* ✅ Move this to the top level */}
      <div className="w-screen h-screen bg-blue-50 p-6 font-inter flex">
         {/* {adminSession && <Sidebar />} */}
        <Sidebar /> {/* ✅ Now inside <BrowserRouter> */}
         <div className="flex-grow ml-6 overflow-hidden pr-4">
        {/* <Header/> */}
        <Pages/>
        </div>
      </div>
    </BrowserRouter>
    );
}
export default Layout;