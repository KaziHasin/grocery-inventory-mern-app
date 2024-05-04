import React, { useState } from 'react';
import CardItem from './CardItem';
import UpdateGroceryItem from './UpdateGroceryItem';



const GroceryItems = ({ items, closeModal, setIsUpdateModalOpen, isUpdateModalOpen, deleteGroceryItem }) => {

    const [selectedGroceryId, setSelectedGroceryId] = useState(null);

    const openModal = (id) => {
        setSelectedGroceryId(id);
        setIsUpdateModalOpen(true);
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

            {isUpdateModalOpen && <UpdateGroceryItem groceryId={selectedGroceryId} closeModal={closeModal} />}

        </div>
    );
};

export default GroceryItems;
