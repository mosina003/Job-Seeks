import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import {Button} from "./ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [Query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(Query));
    navigate("/browse");
  }


  return (
    <div className="text-center">
      <div className="flex flex-col gap-8 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-[#E0F7FA] text-[#008C99] font-medium">
          Your Gateway to Talent & Opportunity!
        </span>

        <h1 className="text-5xl font-bold text-[#1A1A1A]" style={{fontFamily: 'Poppins, sans-serif', fontWeight: 700}}>
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#008C99]">Dream Job</span>
        </h1>
        <p className="text-[#64748B] text-lg" style={{fontFamily: 'Inter, sans-serif'}}>Connecting passionate job seekers with top employers to build successful careers and thriving businesses – all in one platform.</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto mt-4'>
            <input
              type="text"
              placeholder="Search for jobs..."
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none border-none w-full"
              style={{fontFamily: 'Inter, sans-serif'}}
            />
            <Button 
              onClick={searchJobHandler}
              className="rounded-r-full p-3 text-white border-0"
              style={{background: 'linear-gradient(90deg, #00C4CC, #008C99)'}}
            >
                <Search className='h-5 w-5'/>
            </Button>
          </div>
      </div>
    </div>
  );
};

export default HeroSection;
