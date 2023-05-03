import { createSlice } from "@reduxjs/toolkit"

const readCodeStatus = () => {
  const codeStatus = localStorage.getItem("codeStatus")
  return codeStatus !== null ? codeStatus : "none"
}
const initialState = {
  devMode: true,
  codeStatus: readCodeStatus(),
}

export const devSlice = createSlice({
  name: 'dev',
  initialState,
  reducers: {
    toggleDevMode: (state) => {
      state.devMode = !state.devMode
    },
    setCodeStatus: (state, action) => {
      state.codeStatus = action.payload
      localStorage.setItem("codeStatus", action.payload)
    },
  },
})

export const { toggleDevMode, setCodeStatus } = devSlice.actions

export default devSlice.reducer
