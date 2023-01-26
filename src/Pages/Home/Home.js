import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import './Home.css';

const Home = () => {
    const [items, setItems] = useState([]);
    const [deleteItem, setDeleteItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    

    function handleAddModal() {
        setIsOpen(!isOpen);
    }
    

    useEffect(() => {
        fetch('https://inventory-management-app-server.vercel.app/items')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])
    const handleDelete = id => {
        const proceed = window.confirm('Are you sure to delete this task?');
        if (proceed) {
            fetch(`https://inventory-management-app-server.vercel.app/items/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        toast('Deleted successfully');
                        const remaining = deleteItem.filter(dItem => dItem._id !== id);
                        setDeleteItems(remaining);
                    }
                })
        }
    }
    return (
        <div className='home'>
            <button className='btn'>Main Ledger</button>
            <div className='table-frame'>
                <button onClick={handleAddModal} className='btn-add'>Add</button>
                {isOpen && (
                    <Modal handleAddModal={handleAddModal} ></Modal>
                )}
                
                <div>
                    <table className="table">
                        <thead className="table-head">
                            <tr>
                                <th>Item Name</th>
                                <th>Date of Service</th>
                                <th>Remaining Items</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='table-text'>
                            {
                                items?.length && items.map(item =>
                                    <tr className='tr-border' key={item._id}>
                                        <th>{item.name}</th>
                                        <td>{item.date}</td>
                                        <td>{items.length}</td>
                                        <td><button className='btn-remove' onClick={() => { handleDelete(item._id) }}>Remove</button></td>
                                        <td><Link to={`/editInfo/${item._id}`}><button className='btn-edit'>Edit</button></Link></td>

                                    </tr>

                                )

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;