import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { SelectGroup, SelectValue } from "@radix-ui/react-select";
import { Select } from "../ui/select";
import { SelectTrigger } from "../ui/select";
import { SelectContent } from "../ui/select";
import { SelectItem } from "../ui/select";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

const EditJob = () => {
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
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const { companies } = useSelector((store) => store.company);

  // Fetch job details on component mount
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setFetchLoading(true);
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const job = res.data.job;
          setInput({
            title: job.title || "",
            description: job.description || "",
            requirements: job.requirements?.join(", ") || "",
            location: job.location || "",
            salary: job.salary || "",
            jobType: job.jobType || "",
            experience: job.experienceLevel || "",
            position: job.position || "",
            companyId: job.company?._id || "",
          });
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch job details");
        navigate("/admin/jobs");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, navigate]);

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
      const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, input, {
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
      toast.error(error.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin" style={{color: '#008C99'}} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-10">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-5xl w-full border border-gray-200 shadow-xl rounded-xl bg-white"
          style={{fontFamily: 'Inter, sans-serif'}}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/jobs")}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold" style={{color: '#1A1A1A', fontFamily: 'Poppins, sans-serif'}}>Edit Job</h1>
              </div>
              <p className="text-sm mt-1 ml-12" style={{color: '#64748B'}}>Update the job posting details</p>
            </div>
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
                <Select onValueChange={selectChangeHandler} value={companies.find(c => c._id === input.companyId)?.name?.toLowerCase()}>
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

          <div className="flex gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/jobs")}
              className="flex-1"
            >
              Cancel
            </Button>
            {loading ? (
              <Button disabled className="flex-1" style={{background: 'linear-gradient(90deg, #00C4CC, #008C99)'}}>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="flex-1 text-white border-0 hover:opacity-90" 
                style={{background: 'linear-gradient(90deg, #00C4CC, #008C99)'}}
              >
                Update Job
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
