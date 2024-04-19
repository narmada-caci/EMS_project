import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MyComponent() {
    const [data, setData] = useState(null);
    const [newItem, setNewItem] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setIsLoading(true);
        axios.get('http://localhost:8080/api/employee')
            .then(response => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    };

    const addEmployee = () => {
        setIsLoading(true);
        axios.post('http://localhost:8080/api/employee', { name: newItem })
            .then(() => {
                fetchData();
                setNewItem('');
            })
            .catch(error => {
                console.error('Error adding item:', error);
                setIsLoading(false);
            });
    };

    const deleteItem = (itemId) => {
        setIsLoading(true);
        axios.delete(`http://localhost:8080/api/employee/${itemId}`)
            .then(() => {
                fetchData();
            })
            .catch(error => {
                console.error('Error deleting item:', error);
                setIsLoading(false);
            });
    };

    const updateItem = (itemId, newName) => {
        setIsLoading(true);
        axios.put(`http://localhost:8080/api/employee/${itemId}`, { name: newName })
            .then(() => {
                fetchData();
            })
            .catch(error => {
                console.error('Error updating item:', error);
                setIsLoading(false);
            });
    };

    return (
        <div>
            <div>
                <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
                <Link to={"/AddEmployee"}>Add Employee</Link>
            </div>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {data && data.map(item => (
                            <li key={item.id}>
                                {item.name}
                                <button onClick={() => deleteItem(item.id)}>Delete</button>
                                <button onClick={() => updateItem(item.id, `${item.name} Updated`)}>Update</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default MyComponent;
