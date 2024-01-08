import React, { useState } from 'react';
import Loader from './Loader';
import { toast } from 'react-toastify';


const AddGroceryItem = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    brand: '',
    productName: '',
    pricePerKg: '',
    discountPercentage: '',
    isAvailable: true,
  });
  const [loading, setLoading] = useState(false)

  const baseUrl = 'http://localhost:4000/api';
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const res = await fetch(`${baseUrl}/grocery`,{ 
        method: "POST",
        headers: {
             'Content-Type': 'application/json'
                },
        body: JSON.stringify(formData)
      });
       
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Server error: ${res.status} - ${JSON.stringify(errorData)}`);
      }
      const result = await res.json();
      toast.success(result.message);
      closeModal();  
    } catch (err) {
        if (err.message) {
          const errorMessages = err.message
          .split(':')
          .pop()
          .split(',')
          .map((error) => error.replace(/["'}]/g, '').trim());
          console.log(errorMessages);
          errorMessages.forEach((error, index) => {
            toast.error(`${index + 1}: ${error.trim()}`);
          });
        } else {
          toast.error(`Something went wrong, please try again later`);
        }
      setLoading(false)

    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black opacity-50 fixed inset-0" onClick={closeModal}>X</div>
      <div className="bg-white p-6 rounded-lg z-10 max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-4">Add Grocery Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pricePerKg" className="block text-sm font-medium text-gray-700">
              Price per KG
            </label>
            <input
              type="text"
              id="pricePerKg"
              name="pricePerKg"
              value={formData.pricePerKg}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              
            />
          </div>
          <div className="mb-4">
            <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">
              Discount Percentage
            </label>
            <input
              type="text"
              id="discountPercentage"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              
            />
          </div>
          <div className="mb-4">
            <label htmlFor="isAvailable" className="block text-sm font-medium text-gray-700">
              Is Available
            </label>
            <select
              id="isAvailable"
              name="isAvailable"
              value={formData.isAvailable}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <button type="submit" className="btn bg-green-600 text-white p-2">
           {loading? <Loader/> : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGroceryItem;
