import { createSlice } from "@reduxjs/toolkit";
import generateNodes from "../../game/helpers/generateNodes";
import calculatePaths from "../../game/helpers/calculatePaths";

const readStoredNodes = () => {
  const nodes = localStorage.getItem("nodes")
  return nodes !== null ? JSON.parse(nodes) : generateNodes()
}

const readStoredPaths = () => {
  const paths = localStorage.getItem("paths")
  const nodes = readStoredNodes()
  // console.log("triggered",calculatePaths(nodes))
  if (paths === null){
    return calculatePaths(nodes)
  } else{
    const parsedPaths = JSON.parse(paths)
    if (parsedPaths.length === 0) {
      return calculatePaths(nodes)
    } else {
      return JSON.parse(paths)
  }}
}

const initialState = {
  nodes : readStoredNodes(),
  paths : readStoredPaths(),
  position: Number(localStorage.getItem("position")) || 1,
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    resetMap: (state) => {
      state.nodes = generateNodes();
      localStorage.setItem("nodes", JSON.stringify(state.nodes))
      state.paths = calculatePaths(state.nodes);
      localStorage.setItem("paths", JSON.stringify(state.paths))
      state.position = 1;
      localStorage.setItem("position", "1")
    },
  }
})

export const { resetMap } = mapSlice.actions

export default mapSlice.reducer
