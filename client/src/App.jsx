import React, { useState, useEffect } from 'react';
import AddGroceryItem from './components/AddGroceryItem';
import GroceryItems from './components/GroceryItems';
import { FaPlus } from 'react-icons/fa';
import Loader from './components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const baseUrl = 'http://localhost:4000/api';
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);


    const fetchItems = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${baseUrl}/grocery`);
    
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
    
        const result = await res.json();
        setItems(result.groceries)
        
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(false)

      }finally{
        setLoading(false)

      }
    }
    
    useEffect(() => {
      fetchItems();
    }, []);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      fetchItems();
    };
    

    return (
      
        <div className='container mx-auto px-3 mt-4'>
      <ToastContainer />

            <div className='flex justify-between mb-4'>
            <h1 className='inline-block text-center bg-blue-800 text-white p-4'>Grocery Inventory</h1>
            <button type="button" onClick={openModal} className='btn bg-green-700 text-white flex items-center p-2'><FaPlus /> &nbsp;Add Item</button>
            </div>
            {isModalOpen && <AddGroceryItem closeModal={closeModal} />}

           {loading ? 
           
          <div className='w-full flex justify-center'>
             <Loader/> 
          </div>
           : 
           <GroceryItems items={items} />} 
        </div>
    );
};

export default App;
