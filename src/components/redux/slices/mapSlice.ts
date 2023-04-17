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

const readStoredTraveledPaths = () => {
  const traveledPaths = localStorage.getItem("traveledPaths")
  return traveledPaths !== null ? JSON.parse(traveledPaths) : [] as string[]
}

const initialState = {
  nodes : readStoredNodes(),
  paths : readStoredPaths(),
  traveledPaths: readStoredTraveledPaths(),
  position:  localStorage.getItem("level") || "start",
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
      state.traveledPaths = [];
      localStorage.setItem("traveledPaths", JSON.stringify([]))
      state.position = "start";
      localStorage.setItem("level", state.position)
    },
    updateMap: (state, action) => {
      state.traveledPaths.push(action.payload)
      state.position = action.payload;
      localStorage.setItem("level", state.position.toString())
    },
    resetPosition: (state) => {
      state.position = "start";
      localStorage.setItem("level", state.position)
    }
  }
})

export const { resetMap, updateMap, resetPosition } = mapSlice.actions

export default mapSlice.reducer
