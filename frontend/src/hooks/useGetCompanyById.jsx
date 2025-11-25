import { useEffect } from 'react'
import { setAllJobs } from '@/redux/jobSlice'   
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice';


const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {withCredentials: true});
                if(res.data.success){
                    // backend returns the company as `company` in the response
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            }
        };

        fetchSingleCompany();
    }, [companyId, dispatch]); 
}

export default useGetCompanyById