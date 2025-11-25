import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
  name: 'company',
  initialState: {
    // provide a safe default object so components can read properties immediately
    singleCompany: {
      name: "",
      description: "",
      website: "",
      location: "",
      logo: null,
    },
    companies:[],
    searchCompanyByText:"",
  },
  reducers: {
    //actions

    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },

    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    }
}
});
export const { setSingleCompany, setCompanies, setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;