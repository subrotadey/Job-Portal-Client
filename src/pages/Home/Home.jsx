import React from 'react';
import Banner from './Banner';
import JobCategorySection from './JobCategorySection';
import HotJobs from './HotJobs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <JobCategorySection></JobCategorySection>
            <HotJobs></HotJobs>
        </div>
    );
};

export default Home;