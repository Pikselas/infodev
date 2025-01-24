import { Route, Routes } from 'react-router-dom';
import Revenue from './Revenue';
function AppRoutes() {
    return (
        <Routes>
              <Route path="/revenue/*" element={<Revenue/>}/>
            </Routes>
    )
}

export default AppRoutes