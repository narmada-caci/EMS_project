import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import MyComponent from "./Api";
import AddEmployeeForm from "./AddEmployee";
import EmployeeTable from "./Table";

function Layout() {
  const [employees, setEmployees] = useState([]);

  const handleAddEmployee = (newEmployee) => {
      setEmployees([...employees, newEmployee]);
  };

  return (
      <div className="App">
          <h2>Employee List</h2>
          <EmployeeTable employees={employees} /> {/* Render the EmployeeTable component */}
      </div>
  );
}

export default Layout;
