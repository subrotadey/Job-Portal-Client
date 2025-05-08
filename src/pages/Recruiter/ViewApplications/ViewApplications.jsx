import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ViewApplications = () => {
    const application = useLoaderData();
    return (
        <div>
            <h2 className='text-3xl'>Applications for this job: {application.length}</h2>
        </div>
    );
};

export default ViewApplications;