import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import AddEmployeeForm from "./AddEmployee";
import UpdateEmployeeForm from "../Update";

export default function CustomRoute(){
    return <>
      <h2 className='test-primary'>EmployeeManagemenSystem</h2>
    <Routes>
      
    <Route index="/" element = {<Dashboard/>}/>
    <Route path='/AddEmployee' element={<AddEmployeeForm />} />
    <Route path='/EditEmployee/:id' element={<AddEmployeeForm />} />
</Routes>

</>
}