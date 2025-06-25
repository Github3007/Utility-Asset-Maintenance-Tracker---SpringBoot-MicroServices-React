import './App.css';
import ListAssetsComponent from './components/ListAssetsComponent';
//import HeaderComponent from './components/HeaderComponent';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AssetComponent from './components/AssetComponent';
import MaintenancePlans from './components/MaintenancePlans';
import CreatePlan from './components/CreatePlan';
import HomePage from './components/HomePage'
import Tasklist from './components/Tasklist';
import UpdateMaintenancePlan from './components/UpdateMaintenancePlan';
import Login from './components/Login';
import Register from './components/Register';
import WorkOrderMainPage from './components/WorkOrderMainPage';
import WorkLogForm from './components/WorkLogForm';
import WorkLogList from './components/WorkLogList';
import WorkOrderForm from './components/WorkOrderForm';
import WorkOrderList from './components/WorkOrderList';
import Navbar from './components/Navbar';

import './axiosConfig';
import ListLocationsComponent from './components/ListLocationsComponent';
import TechnicianList from './components/TechnicianList';
import AssignTechnicianForm from './components/AssignTechnicianForm';
import AssignmentList from './components/AssignmentList';
import Reporting from "./components/Reporting";
import UpdateTask from './components/UpdateTask';
import AddLocationComponent from './components/AddLocationComponent';

function App() {
  return (
    <>
    <BrowserRouter>


      <Navbar/>
     <Routes>
          
         <Route path='/' element={<HomePage/>}></Route>
         <Route path='/assets' element={<ListAssetsComponent/>}></Route>
        <Route path='/add-asset' element={<AssetComponent/>}></Route>
        <Route path='/update-asset/:assetId' element={<AssetComponent/>}></Route>
        <Route path='/locations' element={<ListLocationsComponent/>}></Route>
 
        <Route path="/maintenance" element={<MaintenancePlans />} />
        <Route path="/add-maintenance" element={<CreatePlan />} />
        <Route path="/tasks/:planId" element={<Tasklist />} />
        <Route path="/update-maintenance/:planId" element={<UpdateMaintenancePlan />} />
       
         
         <Route path='/report' element={<Reporting/>}></Route> 
          
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/register' element={<Register/>}></Route>
        
         
        <Route path="/update-task/:taskId" element={<UpdateTask />} />

        <Route path="/add-location" element={<AddLocationComponent />} />
 
          <Route path='/workorder' element={<WorkOrderMainPage/>}></Route>
          <Route path='/workOrders' element={<WorkOrderList/>}></Route>
          <Route path='/addWorkOrder' element={<WorkOrderForm/>}></Route>
          <Route path='/workLogs' element={<WorkLogList/>}></Route>
          <Route path='/addWorkLog' element={<WorkLogForm/>}></Route>

          <Route path="/technicians" element={<TechnicianList />} />
         <Route path="/assign" element={<AssignTechnicianForm />} />
         <Route path="/assignments" element={<AssignmentList />} />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
