import { Route, Routes } from 'react-router-dom';
import ServiceWiseRevenue from '../Pages/Revenue/ServiceWiseRevenue';
import EmployeeWiseRevenue from '../Pages/Revenue/EmployeeWiseRevenue';
import PaymentModeWiseRevenue from '../Pages/Revenue/PaymentModeWiseRevenue';
import DoctorWiseRevenue from '../Pages/Revenue/DoctorWiseRevenue';
// import Login from "./Login"


function Revenue() {
  return (
        <Routes>
          {/* <Route path="/login" element={<Login/>}/> */}
          <Route path="/service" element={<ServiceWiseRevenue/>}/>
          <Route path="/employee" element={<EmployeeWiseRevenue/>}/>
          <Route path="/doctor" element={<DoctorWiseRevenue/>}/>
          <Route path="/payment_mode" element={<PaymentModeWiseRevenue/>}/>
        </Routes>
  );
}

export default Revenue;