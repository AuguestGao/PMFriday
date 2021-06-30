import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  backgroundColor: 'null',
  opacity: 0,
  fontSize: '13px',
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers:{},
  isHidden: true,
})

export default settingsSlice.reducer