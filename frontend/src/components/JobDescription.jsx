import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constant'

const JobDescription = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { singleJob } = useSelector((store) => store.job)
    const { user } = useSelector((store) => store.auth)

    // Robust applied check: accepts job object or falls back to `singleJob`
    const hasUserApplied = (job = null) => {
        const apps = (job ? job.applications : singleJob?.applications) || []
        if (!user) return false
        return apps.some((app) => {
            if (!app) return false
            if (typeof app === 'string') return String(app) === String(user._id)
            // application could be Application doc with `applicant` populated as object or id
            if (app.applicant) {
                if (typeof app.applicant === 'string') return String(app.applicant) === String(user._id)
                return String(app.applicant._id) === String(user._id)
            }
            // legacy check for applicantId or applicant field
            return String(app.applicantId || app.applicant || '') === String(user._id)
        })
    }

    const [isApplied, setIsApplied] = useState(false)
    const params = useParams()
    const jobId = params.id
    const [error, setError] = useState('')

    const applyJobHandler = async () => {
        if (!user) {
            toast.error('Please login to apply for this job')
            navigate('/login')
            return
        }

        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true,
            })
            if (res.data?.success) {
                setIsApplied(true)
                const newApp = res.data.application || res.data.applicationDoc || res.data.app || { applicant: user._id }
                const updatedApplications = [...(singleJob?.applications || []), newApp]
                dispatch(setSingleJob({ ...singleJob, applications: updatedApplications }))
                toast.success(res.data.message || 'Application submitted')
            }
        } catch (err) {
            console.error('Failed to apply for job:', err)
            const msg = err.response?.data?.message || err.message || 'Failed to apply for job'
            // treat explicit "already applied" response as applied and update UI
            const status = err.response?.status
            if (status === 400 && /already applied/i.test(msg)) {
                setIsApplied(true)
                const updatedApplications = [...(singleJob?.applications || []), { applicant: user._id }]
                dispatch(setSingleJob({ ...singleJob, applications: updatedApplications }))
                toast.error(msg)
                return
            }
            toast.error(msg)
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
                if (res.data?.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(hasUserApplied(res.data.job))
                }
            } catch (err) {
                console.error('Failed to fetch job:', err)
                setError(err.response?.data?.message || 'Failed to load job details')
            }
        }

        fetchSingleJob()
    }, [jobId, dispatch, user?._id])

    return (
        <div className="max-w-7xl mx-auto my-10">
            {error ? (
                <div className="text-center py-10">
                    <h1 className="text-2xl font-bold text-red-600">{error}</h1>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                            <div className="flex items-center gap-2 mt-4">
                                <Badge className="text-blue-700 font-bold" variant="ghost">
                                    {singleJob?.position} Positions
                                </Badge>
                                <Badge className="text-[#F83002] font-bold" variant="ghost">
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className="text-[#7209b7] font-bold" variant="ghost">
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>

                        <Button
                            onClick={isApplied ? undefined : applyJobHandler}
                            disabled={isApplied}
                            className={`rounded-lg ${
                                isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#F83002] hover:bg-[#dc2626] text-white'
                            }`}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>

                    <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>

                    <div className="my-4">
                        <h1 className="font-bold my-1">
                            Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span>
                        </h1>
                        <h1 className="font-bold my-1">
                            Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span>
                        </h1>
                        <h1 className="font-bold my-1">
                            Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span>
                        </h1>
                        <h1 className="font-bold my-1">
                            Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} years</span>
                        </h1>
                        <h1 className="font-bold my-1">
                            Total Applicants:{' '}
                            <span className="pl-4 font-normal text-gray-800">
                                {singleJob?.applications?.length || 0}{' '}
                                {(singleJob?.applications?.length || 0) === 1 ? 'applicant' : 'applicants'}
                            </span>
                        </h1>
                        <h1 className="font-bold my-1">
                            Type: <span className="pl-4 font-normal text-gray-800">{singleJob?.jobType}</span>
                        </h1>
                        <h1 className="font-bold my-1">
                            Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span>
                        </h1>
                        <h1 className="font-bold my-1">
                            Posted On:{' '}
                            <span className="pl-4 font-normal text-gray-800">
                                {singleJob?.createdAt ? String(singleJob.createdAt).split('T')[0] : ''}
                            </span>
                        </h1>
                    </div>
                </>
            )}
        </div>
    )
}

export default JobDescription















