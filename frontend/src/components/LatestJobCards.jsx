import React from 'react'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'

const LatestJobCards = ({job}) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}
      onClick={()=> navigate(`/jobs/description/${job._id}`)} 
      className='p-5 rounded-md shadow-md bg-white border border-gray-100 cursor-pointer transition-all duration-300'
      style={{fontFamily: 'Inter, sans-serif'}}
    >
        <div>
            <h1 className='font-bold text-lg' style={{color: '#1A1A1A'}}>{job.company?.name}</h1>
            <p className='text-sm' style={{color: '#64748B'}}>India</p>
        </div>
        <div>
            <h1 className='font-semibold text-lg my-2' style={{color: '#1A1A1A'}}>{job?.title}</h1>
            <p className='text-sm' style={{color: '#64748B'}}>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4 flex-wrap'>
            <Badge className='font-bold' variant='ghost' style={{color: '#4F46E5'}}>{job?.position} Positions</Badge>
            <Badge className='font-bold' variant='ghost' style={{color: job?.jobType === 'Full-time' ? '#E11D48' : '#F97316'}}>{job?.jobType}</Badge>
            <Badge className='font-bold' variant='ghost' style={{color: '#6A4CFF'}}>{job?.salary} LPA</Badge>
        </div>
    </motion.div>
  )
}

export default LatestJobCards