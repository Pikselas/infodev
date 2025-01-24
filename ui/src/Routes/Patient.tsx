import { Route, Routes } from "react-router-dom";
import NewVsOldPatient from "../Pages/Patient/NewVsOldPatient";

function Revenue() {
    return (
          <Routes>
            <Route path="/new_vs_old" element={<NewVsOldPatient/>}/>
          </Routes>
    );
  }
  
  export default Revenue;