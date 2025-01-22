import { Route, Routes } from 'react-router-dom';
import ServiceWiseRevenue from '../Pages/ServiceWiseRevenue';
import EmployeeWiseRevenue from '../Pages/EmployeeWiseRevenue';
import PaymentModeWiseRevenue from '../Pages/PaymentModeWiseRevenue';
// import Login from "./Login"


function AppRoutes() {
  return (
        <Routes>
          {/* <Route path="/login" element={<Login/>}/> */}
          <Route path="/" element={<ServiceWiseRevenue/>} />
          <Route path="/employee_wise_revenue" element={<EmployeeWiseRevenue/>} />
          <Route path="/payment_mode_wise_revenue" element={<PaymentModeWiseRevenue/>} />
        </Routes>
  );
}

export default AppRoutes;