import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/constant";
import { setLoading } from "@/redux/authSlice";
import { setAuthUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const {loading, user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try{
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_END_POINT}/login`, input,{
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if(response.data.success){
        dispatch(setAuthUser(response.data.user));
        navigate('/');
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      toast.error(error.response.data.message);
    } finally{
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if(user){
      navigate('/');
    }
  }, [user, navigate]);


  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto h-[80vh]">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={changeEventHandler}
              name="email"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={input.password}
              onChange={changeEventHandler}
              name="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-6 my-7">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="applicant"
                  checked={input.role === "applicant"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Applicant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? (
              <Button className="w-full my-4">
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait...
              </Button>
            ) : (
              <button
                type="submit"
                className="bg-[#1bc5d1] hover:bg-[#16a5af] text-white w-full my-4 px-4 py-2 rounded-md mt-4"
              >
                Sign-in
              </button>
            )
          }
          
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#1bc5d1]">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
