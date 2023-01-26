import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';

const EditModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const previousInfo = useLoaderData();
    function handleToggleModal() {
        setIsModalOpen(!isModalOpen);
    }
    const handleEdit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const owner = form.owner.value;
        const vendor = form.vendor.value;
        const info = {
            name: name,
            date: date,
            owner: owner,
            vendor: vendor
        }
        console.log(info)

        fetch(`https://inventory-management-app-server.vercel.app/editInfo/${previousInfo._id}`,
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(info)
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Items Information Updated SuccessFully');
                    console.log(data)
                }
            })
    }
    return (
        <>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <p className='modal-topic'>Edit</p>
                        <form onSubmit={handleEdit}>
                            <div className='input-field'>
                                <div className='label-div'>
                                    <label className='label-text'>Item Name</label>
                                </div>
                                <input className='input-text' type="text" name="name" defaultValue={previousInfo.name} />
                            </div>
                            <div className='input-field'>
                                <label className='label-text'>Date of Service</label>
                                <input className='input-text' type="date" name="date" defaultValue={previousInfo.date} />
                            </div>
                            <div className='input-field'>
                                <label className='label-text'>Owner Name</label>
                                <input className='input-text' type="text" name="owner" defaultValue={previousInfo.owner} />
                            </div>
                            <div className='input-field'>
                                <label className='label-text'>Vendor Name</label>
                                <input className='input-text' type="text" name="vendor" defaultValue={previousInfo.vendor} />
                            </div>
                            <input type="submit" value="Submit" className='btn-submit' />
                            <Link to="/"><button className='btn-close' onClick={handleToggleModal}>X</button></Link>
                        </form>
                    </div>
                </div>

            )}
        </>
    );
};

export default EditModal;