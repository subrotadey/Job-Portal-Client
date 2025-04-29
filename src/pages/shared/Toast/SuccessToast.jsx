import React from 'react';
import { Toaster } from 'react-hot-toast';

const SuccessToast = () => {
    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default SuccessToast;