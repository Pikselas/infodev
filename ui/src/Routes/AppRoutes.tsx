import { Route, Routes } from 'react-router-dom';
import Revenue from './Revenue';
import Patient from './Patient';
function AppRoutes() {
    return (
        <Routes>
          <Route path="/revenue/*" element={<Revenue/>}/>
          <Route path="/patient/*" element={<Patient/>}/>
        </Routes>
    )
}

export default AppRoutes