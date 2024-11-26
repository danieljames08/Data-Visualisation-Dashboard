import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  realTimeData: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // Action for updating real-time data
    updateRealTimeData(state, action) {
      state.realTimeData = action.payload;
    },
    // Optional actions for handling WebSocket state
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { updateRealTimeData, setLoading, setError } = dataSlice.actions;

export default dataSlice.reducer;
