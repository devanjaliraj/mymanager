import { createSlice } from '@reduxjs/toolkit';

export const automation = createSlice({
  name: 'automation',
  initialState: {
    allAutomations: [],
    smartlist: [],
    selectedAutomation: {
      id: '',
      automationName: '',
      startTime: '',
      contactInfo: {},
      campaign: '',
      contacts: '',
      status: '',
      schedules: []
    },
    isLoading: false,
    isEdit: false,
    addNewType: null,
    isNew: false
  },
  reducers: {
    updateSelectedAutomation: (state, action) => {
      state.selectedAutomation = action.payload;
    },

    addNewType: (state, action) => {
      state.addNewType = action.payload;
    },

    addNewActionToSchedule: (state, action) => {
      state.selectedAutomation = action.payload;
    },

    setAllData: (state, action) => {
      state.allAutomations = action.payload;
    },

    setEdit: (state, action) => {
      state.selectedAutomation = state.allAutomations.find((item) => item.id == action.payload);
      state.isEdit = true;
      state.isNew = false;
    },

    setSmartList: (state, action) => {
      state.smartlist = action.payload;
    },

    setAddNewAutomation: (state) => {
      state.selectedAutomation = {
        id: '',
        automationName: '',
        startTime: '',
        contactInfo: {},
        campaign: '',
        contacts: '',
        status: '',
        schedules: []
      };
      state.isEdit = true;
    },

    setcontactInfo: (state, action) => {
      console.log("this is redux data", action.payload)
      state.selectedAutomation.contactInfo = action.payload;
    }
  }
});

//
// updateBillingInfo

export const {
  updateSelectedAutomation,
  addNewType,
  addNewActionToSchedule,
  setAllData,
  setEdit,
  setAddNewAutomation,
  setSmartList,
  setcontactInfo
} = automation.actions;

export default automation.reducer;
