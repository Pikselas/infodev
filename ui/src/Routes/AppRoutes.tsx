import { Route, Routes } from 'react-router-dom';
import Revenue from './Revenue';
import Patient from './Patient';
import Promotions from '../Pages/Others/Promotions';
function AppRoutes() {
    return (
        <Routes>
          <Route path="/revenue/*" element={<Revenue/>}/>
          <Route path="/patient/*" element={<Patient/>}/>
          <Route path="/others/promotion" element={<Promotions/>}/>
        </Routes>
    )
}

export default AppRoutes