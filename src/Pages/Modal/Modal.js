import React from 'react';
import { toast } from 'react-hot-toast';

const Modal = ({handleAddModal}) => {
    
    const handleAdd = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const owner = form.owner.value;
        const vendor = form.vendor.value;
        const addItem = {
            name: name,
            date: date,
            owner: owner,
            vendor: vendor
        }


        fetch('https://inventory-management-app-server.vercel.app/items', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(addItem)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast('Item added successfully!');
                    form.reset();
                }
                console.log(data);
            })
            .catch(error => console.log(error))
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <p className='modal-topic'>Add</p>
                <form onSubmit={handleAdd}>
                    <div className='input-field'>
                        <div className='label-div'>
                            <label className='label-text'>Item Name</label>
                        </div>
                        <input className='input-text' type="text" name="name" />
                    </div>
                    <div className='input-field'>
                        <label className='label-text'>Date of Service</label>
                        <input className='input-text' type="date" name="date" />
                    </div>
                    <div className='input-field'>
                        <label className='label-text'>Owner Name</label>
                        <input className='input-text' type="text" name="owner" />
                    </div>
                    <div className='input-field'>
                        <label className='label-text'>Vendor Name</label>
                        <input className='input-text' type="text" name="vendor" />
                    </div>
                    <input type="submit" value="Submit" className='btn-submit'/>
                    <button className='btn-close' onClick={handleAddModal}>X</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;