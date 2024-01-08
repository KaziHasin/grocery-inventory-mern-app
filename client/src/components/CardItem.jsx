import React from 'react';
import { FaRupeeSign } from "react-icons/fa";
const CardItem = ({ brand, productName, pricePerKg, discountPercentage, isAvailable }) => {
    return (
        <>
            <td className="border-b border-gray-200 p-3 text-center">
                <span className='text-gray-500'>{brand}</span>
            </td>
            <td className="border-b border-gray-200 p-3 text-center">
                <h5 className='text-lg font-semibold tracking-tight text-gray-900'>{productName}</h5>
            </td>
            <td className="border-b border-gray-200 p-3 text-center">
                <div className='text-lg text-gray-900 flex items-center justify-center'><FaRupeeSign/>{pricePerKg}</div>
            </td>
            <td className="border-b border-gray-200 p-3 text-center">
                 
                 {discountPercentage && 
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{discountPercentage} %</span>
                 }
                
            </td>
            <td className="border-b border-gray-200 p-3 text-center">
    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
        {isAvailable ? 'Yes' : 'No'}
    </span>
</td>

        </>
    );
};

export default CardItem;
