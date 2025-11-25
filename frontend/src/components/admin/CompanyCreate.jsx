import React from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {useDispatch} from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY_API_END_POINT } from '@/utils/constant';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();

  const regsiterNewCompany = async() => {
    try{
        const res=await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName}, {
            headers:{
                'Content-Type': 'application/json'

            },
            withCredentials: true
        });
        if(res?.data?.success){
          dispatch(setSingleCompany(res.data.company));
            toast.success(res.data.message);
            const companyId = res?.data?.company?._id;
            navigate(`/admin/companies/${companyId}`); 
        }
    } catch (error){
        console.error("Error creating company:", error);
    }
}
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
        <h1 className="font-bold text-2xl my-5">Create New Company</h1>
        <p className="text-gray-500">Fill in the details below to create a new company.</p>
      </div>

      <Label>Company Name</Label>
        <Input
            type="text"
            placeholder="Enter company name"
            className="my-2 w-1/2"
            onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
            <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
            <Button onClick={regsiterNewCompany}>Continue</Button>
            </div>
    </div>
    </div>
   
  ); 
};

export default CompanyCreate;


