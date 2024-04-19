import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const AddEmployeeForm = ({ onAdd }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [jobtitle, setJobtitle] = useState('');
    const [salary, setSalary] = useState('');
    const [department, setDepartment] = useState('');
    const [emailError, setEmailError] = useState('');
    const[phoneerror, setphoneError] = useState('');
    const params=useParams();



    const AddOrUpdateEmployee = () =>{
        let data ={firstName,lastName,email,phonenumber,jobtitle,salary,department};
        console.log(data);
        if(params.id !== undefined){
            axios.put(`http://localhost:8080/api/employee/${params.id}`, data)
                .then(() => {
                    history('/')
                })
                .catch(error=> {
                    alert(error.message);
                    console.log('Error updating employee:',error);
                });
        }else{
            axios.post('http://localhost:8080/api/employee', data)
                .then(() => {
                    history('/');
                })
                .catch(error => {
                    console.error('Error adding employee:', error);
                    
                });
        }
        
    };

    // const addEmployee = () => {
    //     console.log(params.id);
        
    // };
    // const updateEmployee = () =>{
    //     let data ={firstName,lastName,email,phonenumber,jobtitle,salary,department};
    //     axios.put(`http://localhost:8080/api/employee/${params.id}`, data)
    //         .then(() => {
    //             alert("Successfully Edited");
    //            history('/')
    //         })
    //         .catch(error=> {
    //             console.log('Error updating employee:',error);
    //         });
    // };
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        //  setIsLoading(true);
        axios.get(`http://localhost:8080/api/employee/${params.id}`)
            .then(response => {
                console.log(response.data,"response.data");
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setPhonenumber(response.data.phonenumber);
                setJobtitle(response.data.jobtitle);
                setSalary(response.data.salary);
                setDepartment(response.data.department);
                //setIsLoading(false);
                
            }
            
        )
        .catch((error) => console.log(error));
        
        
    };
    
    const history=useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        AddOrUpdateEmployee();
        // history('/')
        // if (validateEmail(email) && validatephonenumber) {
        //     AddOrUpdateEmployee();
        //     history('/')
        // } else {
        //    if(!validateEmail(email)){
        //     setEmailError("Please enter a valid Email");
        //    }
        //    else{
        //     setEmailError('');

        //    }
        //    if(!validatephonenumber(phonenumber)){
        //     setphoneError("Please Enter a valid phone number");
        // }
        //         else{
        //             setphoneError('');
        //         }
            
        //    }
        
        //    const handleSubmit = (e) => {
        //     e.preventDefault();
        //     AddOrUpdateEmployee();
        //     // Create an object with the form data
        //     const newEmployee = {
        //         firstName: firstName,
        //         lastName:lastName,
        //         email: email,
        //         phonenumber:phonenumber,
        //         jobtitle:jobtitle,
        //         salary:salary,
        //         department: department
                
        //     };
        //     setFirstName('');
        //     setLastName('');
        //     setEmail('');
        //     setPhonenumber('');
        //     setJobtitle('');
        //     setSalary('');
        //     setDepartment('');
    
        // };

       
    };
    // const validatephonenumber = (phonenumber) =>{
    //     const phonePattern = /^\d{10}$/;
    //     return phonePattern.test(phonenumber);
    // }

    // const validateEmail = (email) => {
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailPattern.test(email);
    // };

    const handleCancel = (e) => {
        e.preventDefault();
        history('/')
    };

    return (
        <form onSubmit={handleSubmit} >
            <div  class="sr-only">
            <label>
                firstName:
                <input type="text" class="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </label>
            <label >
                lastName:
                <input type="text"  class="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                
            </label>
            <label >
                Email:
                <input type="email" class="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                {emailError && <div className="error">{emailError}</div>}
            </label>
            <label>
                phonenumber:
                <input 
                    type="tel" 
                    className="form-control" 
                    id="phonenumber"
                    pattern="[0-9]{10}"
                    value={phonenumber} 
                    onChange={(e) => setPhonenumber(e.target.value)} 
                    required 
                />
                {phoneerror && <div className="error">{phoneerror}</div>}
            </label>

            <label>
                jobtitle:
                <input type="text" class="form-control" id="jobtitle" value={jobtitle} onChange={(e) => setJobtitle(e.target.value)} required />
            </label>
            <label>
                salary:
                <input type="number" class="form-control" id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />
            </label>
            <label>
                department:
                <input type="text" class="form-control" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
            </label>
            </div> 
           <div button-container>
            <button className="btn btn-primary" type='submit'>Submit</button>
            <button className="btn btn-danger " onClick={handleCancel}>Cancel</button>
            </div> 
        </form>
    );
};

export default AddEmployeeForm;
