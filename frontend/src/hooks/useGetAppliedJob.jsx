import axios from 'axios';
import { useDispatch } from 'react-redux';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { setAppliedJobs } from '@/redux/applicationSlice';
import { useEffect } from 'react';

const useGetAppliedJob = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAppliedJobs(res.data.applications));
                }
            } catch (error) {
                console.error("Failed to fetch applied jobs:", error);
            }
        };

        fetchAppliedJobs();
    }, []);
};

export default useGetAppliedJob;