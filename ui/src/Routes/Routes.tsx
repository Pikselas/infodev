import { Route, Routes } from 'react-router-dom';
import Dashboard1 from '../Pages/Dashboard';
// import Login from "./Login"


function AppRoutes() {
  return (
        <Routes>
          {/* <Route path="/login" element={<Login/>}/> */}
          <Route path="/" element={<Dashboard1 />} />
        </Routes>
  );
}

export default AppRoutes;