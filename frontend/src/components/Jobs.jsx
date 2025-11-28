import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { useState } from "react";
import {motion} from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from "./ui/button";


const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8,9];

const Jobs = () => {
  // read `allJobs` safely from the `job` slice and provide a default array
  const {allJobs, searchedQuery} = useSelector((store) => store.job ?? {allJobs: [], searchedQuery: ''});
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilters, setShowFilters] = useState(false);

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
      <div className='max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8'>
        {/* Mobile Filter Button */}
        <div className='lg:hidden mb-4'>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2"
            variant="outline"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className='flex gap-5 relative'>
          {/* Desktop Filter Sidebar */}
          <div className='hidden lg:block w-[20%] xl:w-[15%]'>
            <FilterCard />
          </div>

          {/* Mobile Filter Sidebar - Overlay */}
          {showFilters && (
            <>
              {/* Backdrop */}
              <div 
                className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40'
                onClick={() => setShowFilters(false)}
              />
              
              {/* Sliding Filter Panel */}
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className='lg:hidden fixed left-0 top-0 h-full w-[80%] max-w-sm bg-white z-50 overflow-y-auto shadow-2xl'
              >
                <div className='sticky top-0 bg-white border-b p-4 flex items-center justify-between'>
                  <h2 className='font-bold text-lg' style={{fontFamily: 'Poppins, sans-serif'}}>Filters</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className='p-4'>
                  <FilterCard onFilterChange={() => setShowFilters(false)} />
                </div>
              </motion.div>
            </>
          )}

          {/* Jobs Grid */}
          <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
            {filterJobs.length <= 0 ? (
              <div className='flex flex-col items-center justify-center h-64'>
                <p className='text-gray-500 text-lg'>No jobs found</p>
                <p className='text-gray-400 text-sm mt-2'>Try adjusting your filters</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                {filterJobs.map((job, index) => (
                  <motion.div
                    initial={{opacity:0, y:20}}
                    animate={{opacity:1, y:0}}
                    exit={{opacity:0, y:-20}}
                    transition={{duration:0.3, delay: index * 0.05}}
                    key={job?._id || index }>
                    <Job job={job}  />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
