import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Homepage from './Pages/Homepage/HomePage';
import Floorpage from './Pages/Floorpage/Floorpage';
import BuildingPage from './Pages/Buildingspage/building';
import Login from './Pages/LoginPage/Loginpage';
import Error from './Pages/ErrorPage/Error';
import BuildingPageEd from './Pages/Enable-Disable/Buildings_ed';
import Wspmpage from './Pages/Workstation/Wspage/Wspmpage1';
import Floorpage_ed from './Pages/Enable-Disable/Floorpage_ed';
import Rdp from './Pages/Buildingspage/Rdp';
import Disable from './Pages/Enable-Disable/Wsdisable';
import Table from './Pages/ManageBooking/managebooking'
import Wsedit from './Pages/Workstation/Wspage/Wsedit';
import { Navbar } from './Pages/Navbar/Navbar';
import Daterange from './Pages/daterange/Daterange';
import TimeePickerTest from './Pages/daterange/Timepicker';
import Databaseupdate from './Pages/DatabaseUpload/databaseupdate';
import Conference from './Pages/Workstation/Wspage/Conference';
import Newchart from './Pages/Reportspage/Newchart';
function App() {
 
  return (
    <Router>
     <Routes>
       <Route path ="/" element ={<Login/>}/>
       <Route path ="/login" element ={<Login/>}/>
       <Route path ="/database" element ={<Databaseupdate/>}/>
       <Route path ="/home" element ={<Homepage/>}/>
       <Route path ="/building" element ={<BuildingPage/>}/>
       <Route path ="/buildinged" element ={<BuildingPageEd/>}/>
       <Route path ="/floor_ed" element ={<Floorpage_ed/>}/>
       <Route path ="/floor" element ={<Floorpage/>}/>
       <Route path ="/disable" element ={<Disable/>}/>
       <Route path ="/manage" element ={<Table/>}/>
       <Route path ="/wsedit" element ={<Wsedit/>}/>
       <Route path ="/workstation" element ={<Wspmpage/>}/>
       <Route path ="/cf" element ={<Conference/>}/>
       <Route path ="/reports" element ={<Newchart/>}/>
       {/* <Route path ="*" element ={<Error/>}/> */}
       

       
       </Routes>
       
    </Router>
  );
}

export default App;
