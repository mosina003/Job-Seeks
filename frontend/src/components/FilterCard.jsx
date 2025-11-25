import React, { useEffect } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';


const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"]
    },
    {
        filterType: "Industry",
        array: ["Software", "Finance", "Healthcare", "Education", "Retail"]
    },
    {
        filterType: "Experience Level",
        array: ["Fresher", "1-3 Years", "3-5 Years", "5+ Years"]
    },
    {
        filterType: "Job Type",
        array: ["Full Time", "Part Time"]
    },
    {
        filterType: "Salary Range",
        array: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15+ LPA"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const ChangeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(() => {
        // You can perform actions based on the selected filter value here
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);
    return (
        <div className='w-full bg-white p-3 rounded-md shadow-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='my-3' />
            <RadioGroup value={selectedValue} onValueChange={ChangeHandler}>
            {
                filterData.map((data, index) => (
                    <div key={index} className='mb-4'>
                        <h1 className='font-bold text-lg mb-2'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const radioId = `${data.filterType}-${idx}`;
                                    return (
                                        <div className='flex items-center space-x-2 my-2' key={idx}>
                                            <RadioGroupItem value={item} id={radioId} />
                                            <Label htmlFor={radioId} className='cursor-pointer'>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                    </div>
                ))
            }
            </RadioGroup>
        </div>
    )
}

export default FilterCard

