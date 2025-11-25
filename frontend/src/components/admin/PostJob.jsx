import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import store from "@/redux/store";
import { useSelector } from "react-redux";
import { SelectGroup, SelectValue } from "@radix-ui/react-select";
import { Select } from "../ui/select";
import { SelectTrigger } from "../ui/select";
import { SelectContent } from "../ui/select";
import { SelectItem } from "../ui/select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const companyArray = [];

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });
  //create a state variable for loading
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //post job api call
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-10">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-5xl w-full border border-gray-200 shadow-xl rounded-xl bg-white"
          style={{fontFamily: 'Inter, sans-serif'}}
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold" style={{color: '#1A1A1A', fontFamily: 'Poppins, sans-serif'}}>Post a New Job</h1>
            <p className="text-sm mt-1" style={{color: '#64748B'}}>Fill in the details to create a new job posting</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title" className="text-sm font-medium" style={{color: '#1A1A1A'}}>Job Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="e.g. Senior Software Engineer"
                className="focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#008C99] mt-2"
                value={input.title}
                onChange={changeEventHandler}
                required
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-sm font-medium" style={{color: '#1A1A1A'}}>Location</Label>
              <Input
                id="location"
                type="text"
                name="location"
                placeholder="e.g. Bangalore, India"
                className="focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#008C99] mt-2"
                value={input.location}
                onChange={changeEventHandler}
                required
              />
            </div>

            <div>
              <Label htmlFor="salary" className="text-sm font-medium" style={{color: '#1A1A1A'}}>Salary (LPA)</Label>
              <Input
                id="salary"
                type="number"
                name="salary"
                placeholder="e.g. 12"
                className="focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#008C99] mt-2"
                value={input.salary}
                onChange={changeEventHandler}
                required
              />
            </div>

            <div>
              <Label htmlFor="jobType" className="text-sm font-medium" style={{color: '#1A1A1A'}}>Job Type</Label>
              <Input
                id="jobType"
                type="text"
                name="jobType"
                placeholder="e.g. Full-time, Part-time"
                className="focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#008C99] mt-2"
                value={input.jobType}
                onChange={changeEventHandler}
                required
              />
            </div>

            <div>
              <Label htmlFor="experience" className="text-sm font-medium" style={{color: '#1A1A1A'}}>Experience Level (Years)</Label>
              <Input
                id="experience"
                type="number"
                name="experience"
                placeholder="e.g. 3"
                className="focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#008C99] mt-2"
                value={input.experience}
                onChange={changeEventHandler}
                required
              />
            </div>

            <div>
              <Label htmlFor="position" className="text-sm font-medium" style={{color: '#1A1A1A'}}>Number of Positions</Label>
              <Input
                id="position"
                type="number"
                name="position"
                placeholder="e.g. 5"
                className="focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#008C99] mt-2"
                value={input.position}
                onChange={changeEventHandler}
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="description" className="text-sm font-medium" style={{color: '#1A1A1A'}}>Job Description</Label>
              <Input
                id="description"
                type="text"
                name="description"
                placeholder="Brief description of the job role"
                className="focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#008C99] mt-2"
                value={input.description}
                onChange={changeEventHandler}
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="requirements" className="text-sm font-medium" style={{color: '#1A1A1A'}}>Requirements</Label>
              <Input
                id="requirements"
                type="text"
                name="requirements"
                placeholder="e.g. React, Node.js, MongoDB (comma separated)"
                className="focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#008C99] mt-2"
                value={input.requirements}
                onChange={changeEventHandler}
                required
              />
            </div>

            {companies.length > 0 && (
              <div className="col-span-2">
                <Label className="text-sm font-medium" style={{color: '#1A1A1A'}}>Select Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="mt-2 focus:ring-1 focus:ring-[#008C99]">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => {
                        return (
                          <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                            {company.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {loading ? (
            <Button disabled className="w-full mt-8" style={{background: 'linear-gradient(90deg, #00C4CC, #008C99)'}}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button 
              type="submit" 
              className="w-full mt-8 text-white border-0 hover:opacity-90" 
              style={{background: 'linear-gradient(90deg, #00C4CC, #008C99)'}}
            >
              Post New Job
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-sm text-red-600 font-semibold text-center mt-4 p-3 bg-red-50 rounded-lg">
              ⚠️ Please register a company first before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
