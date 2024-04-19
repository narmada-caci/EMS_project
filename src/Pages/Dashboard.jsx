import { useEffect, useState } from "react";
import AddEmployeeForm from "./AddEmployee";
import Table from "./Table";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateEmployeeForm from "../Update";

export default function Dashboard(){
    const [data, setData] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ firstName: '', lastName: '', email: '', phonenumber: '', jobtitle: '', salary: '', department: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [openForm, setopenForm] = useState(false);
     const [tabledata,setTableData] = useState({id:"",openForm:false});


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setIsLoading(true);
        axios.get('http://localhost:8080/api/employee')
            .then(response => {
                console.log(response);
                setData(response.data);
                setIsLoading(false);
            }).catch(error => {
                console.error('Error Fetching data:',error);
            });
    };

 
    const deleteEmployee = (employeeId) => {
        
        setIsLoading(true);
        axios.delete(`http://localhost:8080/api/employee/${employeeId}`)
            .then(() => {
                fetchData();
            })
            .catch(error => {
                console.error('Error deleting item:', error);
                setIsLoading(false);
            });
    };

    const updateEmployee = (employeeId, newData) => {
        setIsLoading(true);
        axios.put(`http://localhost:8080/api/employee/${employeeId}`, newData)
            .then(() => {
                fetchData();
           
            })
            .catch(error=>{
                console.error('Error updating item:',error);
            });
    };
    return <div>


<div style={{}}>

<Link to="/AddEmployee" style={{textDecoration:"none"}}>Add Employee</Link>
</div>

<Table employees={data} onDelete={deleteEmployee} onEdit={updateEmployee} setTableData={setTableData} tableda={tabledata}/>
                 
                 {/* {
                    tabledata.openForm &&<UpdateEmployeeForm id={tabledata.id} setTableData={setTableData} tabledata={tabledata} ></UpdateEmployeeForm>
                 }   */}
    </div>
}