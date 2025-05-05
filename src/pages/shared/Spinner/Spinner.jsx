import React from 'react';
import { RingLoader } from 'react-spinners';

const Spinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <RingLoader color="#36d7b7" size={60} />
            <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
    );
};

export default Spinner;

