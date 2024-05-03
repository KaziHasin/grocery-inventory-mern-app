import React, { useState } from 'react';
import CardItem from './CardItem';
import UpdateGroceryItem from './UpdateGroceryItem';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';

const GroceryItems = ({ items }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGroceryId, setSelectedGroceryId] = useState(null);


    const openModal = (id) => {
        setSelectedGroceryId(id);
        setIsModalOpen(true);
    };

    const deleteGroceryItem = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/grocery/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!res.ok) { throw new Error("Failed to fetch data"); }

            const result = await res.json();
            if (result.message) {
                toast.success(result.message);
            }


        } catch (error) {
            console.log(error);

        }
    }

    const closeModal = () => {
        setIsModalOpen(false);

    };
    return (
        <div className="overflow-x-auto">
            {items.length > 0 ? (
                <table className="min-w-full table-auto border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border-b border-gray-200 p-3">Brand</th>
                            <th className="border-b border-gray-200 p-3">Product Name</th>
                            <th className="border-b border-gray-200 p-3">Price per KG</th>
                            <th className="border-b border-gray-200 p-3">Discount Percentage</th>
                            <th className="border-b border-gray-200 p-3">Availability</th>
                            <th className="border-b border-gray-200 p-3">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id}>
                                <CardItem {...item} openModal={openModal} deleteGroceryItem={deleteGroceryItem} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center bg-blue-500 text-white p-3 mt-4">No items are available in inventory.</p>
            )}

            {isModalOpen && <UpdateGroceryItem groceryId={selectedGroceryId} closeModal={closeModal} />}

        </div>
    );
};

export default GroceryItems;
