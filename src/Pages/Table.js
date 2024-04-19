import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';


const Table = ({ employees, onEdit, onDelete, setTableData, tabledata }) => {
    // const handleDelete = (id) => {
    //     const confirmDelete = window.confirm('Are you sure you want to delete');
    //     if (confirmDelete) {
    //         onDelete(id);
    //     }
        
    // };
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (id) => {
        setShowModal(true);
        setDeleteId(id);
    };
    const handleDelete = (id) => {
        onDelete(id);
    };

    return (
        <div>
            <table className='table m-3'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>email</th>
                        <th>phonenumber</th>
                        <th>jobtitle</th>
                        <th>Salary</th>
                        <th>department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phonenumber}</td>
                            <td>{employee.jobtitle}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.department}</td>
                            <td>
                                <span>
                                    <Link to={`/EditEmployee/${employee.id}`} className="btn btn-primary m-1" onClick={() => {
                                        setTableData({ ...tabledata, openForm: true, id: employee.id });
                                    }}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger m-1" onClick={() => handleShowModal(employee.id)}>
                                        Delete
                                    </button>
                                   
                                   
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => {
                        handleDelete(deleteId);
                        handleCloseModal();
                    }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Table;
