import React from 'react'
import { Button } from '@/components/ui/button'
import { Bookmark } from 'lucide-react' 
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'


const Job = ({ job }) => {
  const navigate=useNavigate();
  const jobid=job?._id;

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  }
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}
      className='p-5 rounded-md shadow-md bg-white border border-gray-100 cursor-pointer transition-all duration-300'
      style={{fontFamily: 'Inter, sans-serif'}}
    >
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      
      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-semibold text-lg' style={{color: '#1A1A1A'}}>{job?.company?.name}</h1>
          <p className='text-sm' style={{color: '#64748B'}}>{job?.location}</p>
        </div>
      </div>
      
      <div>
        <h1 className='font-bold text-lg my-2' style={{color: '#1A1A1A'}}>{job?.title}</h1>
        <p className='text-sm' style={{color: '#64748B'}}>{job?.description}</p>
      </div>
      
      <div className='flex items-center gap-2 mt-4 flex-wrap'>
        <Badge className='font-bold' variant='ghost' style={{color: '#4F46E5'}}>{job?.position} Positions</Badge>
        <Badge className='font-bold' variant='ghost' style={{color: job?.jobType === 'Full-time' ? '#E11D48' : '#F97316'}}>{job?.jobType}</Badge>
        <Badge className='font-bold' variant='ghost' style={{color: '#6A4CFF'}}>{job?.salary} LPA</Badge>
      </div>
      
      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={() => navigate(`/jobs/description/${jobid}`)} variant="outline" className='w-full'>Details</Button>
        <Button className="bg-[#F83002] hover:bg-[#dc2626] text-white w-full">Save for Later</Button>
      </div>
    </motion.div>
  )
}

export default Job