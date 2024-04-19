
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyComponent from './Pages/Api';
import  getAllEmployees  from './Pages/Api';
import { useEffect, useState } from 'react';
import Table from './Pages/Table';
import AddEmployeeForm from './Pages/AddEmployee';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomRoute from './Pages/Route';


function App() {

  
   

    
    return (
        
            <div className='wrapper m-5'>
                 <CustomRoute></CustomRoute>
                
               
                
                
            </div>
            
        
    );
}



export default App;
