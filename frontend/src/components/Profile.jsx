import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Mail, Contact, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { useSelector } from "react-redux";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import useGetAppliedJob from "@/hooks/useGetAppliedJob";
import { motion } from "framer-motion";

const Profile = () => {
    useGetAppliedJob();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8"
            >
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24 cursor-pointer">
                            <AvatarImage 
                                src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} 
                                alt="profile" 
                            />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio || "Add your Bio here"}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
                        <Pen className="mr-2" />
                        Edit
                    </Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber || "+1234567890"}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='font-bold text-lg mb-3'>Skills</h1>
                    <div className='flex items-center gap-2 flex-wrap'>
                        {
                            user?.profile?.skills?.length > 0 ? user?.profile?.skills.map((skill, index) => <Badge key={index}>{skill}</Badge>) : <span>No skills added</span>
                        }
                    </div>
                </div>
                <div className='my-5'>
                    <Label className="text-md font-bold">Resume</Label>
                    <div className='mt-2'>
                        {
                            user?.profile?.resume ? (
                                <>
                                    <a 
                                        target='_blank' 
                                        rel='noopener noreferrer' 
                                        href={`https://docs.google.com/viewer?url=${encodeURIComponent(user?.profile?.resume)}&embedded=true`}
                                        className='text-blue-500 hover:underline cursor-pointer'
                                    >
                                        {user?.profile?.resumeOriginalName}
                                    </a>
                                    <span className='text-gray-500 text-sm ml-2'>(Click to view)</span>
                                </>
                            ) : (
                                <span>No resume uploaded</span>
                            )
                        }
                    </div>
                </div>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8"
            >
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </motion.div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
