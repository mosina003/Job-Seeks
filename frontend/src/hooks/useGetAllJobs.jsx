import { useEffect } from 'react'
import { setAllJobs } from '@/redux/jobSlice'  
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);  

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {withCredentials: true});
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            }
        };

        fetchAllJobs();
    }, [dispatch]); 
}

export default useGetAllJobs