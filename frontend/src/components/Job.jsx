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
      className='p-4 sm:p-5 rounded-md shadow-md bg-white border border-gray-100 cursor-pointer transition-all duration-300 h-full flex flex-col'
      style={{fontFamily: 'Inter, sans-serif'}}
    >
      <div className='flex items-center justify-between mb-3'>
        <p className='text-xs sm:text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full h-8 w-8 sm:h-10 sm:w-10" size="icon">
          <Bookmark className='h-4 w-4' />
        </Button>
      </div>
      
      <div className='flex items-center gap-2 sm:gap-3 my-2'>
        <Button className="p-4 sm:p-6 h-10 w-10 sm:h-12 sm:w-12" variant="outline" size="icon">
          <Avatar className='h-8 w-8'>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div className='flex-1 min-w-0'>
          <h1 className='font-semibold text-base sm:text-lg truncate' style={{color: '#1A1A1A'}}>{job?.company?.name}</h1>
          <p className='text-xs sm:text-sm truncate' style={{color: '#64748B'}}>{job?.location}</p>
        </div>
      </div>
      
      <div className='flex-1'>
        <h1 className='font-bold text-base sm:text-lg my-2 line-clamp-2' style={{color: '#1A1A1A'}}>{job?.title}</h1>
        <p className='text-xs sm:text-sm line-clamp-2' style={{color: '#64748B'}}>{job?.description}</p>
      </div>
      
      <div className='flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 flex-wrap'>
        <Badge className='font-bold text-xs' variant='ghost' style={{color: '#4F46E5'}}>{job?.position} Positions</Badge>
        <Badge className='font-bold text-xs' variant='ghost' style={{color: job?.jobType === 'Full-time' ? '#E11D48' : '#F97316'}}>{job?.jobType}</Badge>
        <Badge className='font-bold text-xs' variant='ghost' style={{color: '#6A4CFF'}}>{job?.salary} LPA</Badge>
      </div>
      
      <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-3 sm:mt-4'>
        <Button onClick={() => navigate(`/jobs/description/${jobid}`)} variant="outline" className='w-full text-sm'>Details</Button>
        <Button className="bg-[#F83002] hover:bg-[#dc2626] text-white w-full text-sm">Save for Later</Button>
      </div>
    </motion.div>
  )
}

export default Job