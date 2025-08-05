import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard.jsx';
import Userprofile from '../pages/Userprofile.jsx';
import Loginpage from '../pages/Loginpage.jsx';
import Astrologers from '../pages/Astrologers.jsx';
import Reports from '../pages/Reports.jsx'
import Users from '../pages/Users.jsx';



const Routespages = ()=>{
    return(
       <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/astrology" element={<Astrologers/>} />
            <Route path="/reports" element={<Reports/>} />
            <Route path="/users" element={<Users/>} />
            <Route path="*" element={<h2 className="text-xl text-red-600">404 - Page Not Found</h2>} />
            <Route path="/userprofile/:id" element={<Userprofile/>} />
            <Route path="/loginpage" element={<Loginpage/>} />
        </Routes>
    );
}
export default Routespages;