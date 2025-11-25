import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { useState } from "react";
import {motion} from 'framer-motion';


const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8,9];

const Jobs = () => {
  // read `allJobs` safely from the `job` slice and provide a default array
  const {allJobs, searchedQuery} = useSelector((store) => store.job ?? {allJobs: [], searchedQuery: ''});
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if(searchedQuery){
      const filteredJobs= allJobs.filter((job)=>{
          // Basic text search
          const matchesText = job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) || 
                              job?.company?.name?.toLowerCase().includes(searchedQuery.toLowerCase()) || 
                              job?.description?.toLowerCase().includes(searchedQuery.toLowerCase()) || 
                              job?.location?.toLowerCase().includes(searchedQuery.toLowerCase());
          
          // Experience Level filter
          let matchesExperience = false;
          if (searchedQuery === "Fresher") {
            matchesExperience = job?.experienceLevel === 0;
          } else if (searchedQuery === "1-3 Years") {
            matchesExperience = job?.experienceLevel >= 1 && job?.experienceLevel <= 3;
          } else if (searchedQuery === "3-5 Years") {
            matchesExperience = job?.experienceLevel >= 3 && job?.experienceLevel <= 5;
          } else if (searchedQuery === "5+ Years") {
            matchesExperience = job?.experienceLevel > 5;
          }
          
          // Job Type filter
          const matchesJobType = job?.jobType?.toLowerCase().replace('-', ' ') === searchedQuery.toLowerCase().replace('-', ' ');
          
          // Salary Range filter
          let matchesSalary = false;
          if (searchedQuery === "0-3 LPA") {
            matchesSalary = job?.salary >= 0 && job?.salary <= 3;
          } else if (searchedQuery === "3-6 LPA") {
            matchesSalary = job?.salary > 3 && job?.salary <= 6;
          } else if (searchedQuery === "6-10 LPA") {
            matchesSalary = job?.salary > 6 && job?.salary <= 10;
          } else if (searchedQuery === "10-15 LPA") {
            matchesSalary = job?.salary > 10 && job?.salary <= 15;
          } else if (searchedQuery === "15+ LPA") {
            matchesSalary = job?.salary > 15;
          }
          
          return matchesText || matchesExperience || matchesJobType || matchesSalary;
      });
      setFilterJobs(filteredJobs);
    }else{
      setFilterJobs(allJobs);
    }


  },[allJobs, searchedQuery]);
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5 px-4'>
        <div className='flex gap-5'>
          <div className='w-[15%]'>
            <FilterCard />
          </div>
          <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
            <div className='grid grid-cols-3 gap-4 mx-auto'>
              {filterJobs.length <= 0 ? (
                <span>Job not found</span>
              ) : (
                filterJobs.map((job, index) => (
                  <motion.div
                    initial={{opacity:0, x:100}}
                    animate={{opacity:1, x:0}}
                    exit={{opacity:0, x:-100}}
                    transition={{duration:0.5}}
                    key={job?._id || index }>
                    <Job job={job}  />
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
