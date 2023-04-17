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

const chanceForRest = 0.1
const readNodeTypes = () => {
  const nodes = readStoredNodes()
  const storedNodeTypes = localStorage.getItem("nodeTypes")
  if (storedNodeTypes !== null) {
    const parsedNodeTypes = JSON.parse(storedNodeTypes)
    return parsedNodeTypes.length === nodes.length ? parsedNodeTypes : calculateNodeTypes()
  }
  return calculateNodeTypes()
}
const calculateNodeTypes = () => {
  const nodes = readStoredNodes()
  const nodeTypes = nodes.map((node : string) => {
    // Logic for generating node types
    if((Math.random() < chanceForRest) && (Number(node.split("-")[1]) > 3)) {
      return [node, "rest"]
    } else {
      return [node, "normal"]
    }
  })
  localStorage.setItem("nodeTypes", JSON.stringify(nodeTypes))
  return nodeTypes
}

const initialState = {
  nodes : readStoredNodes(),
  paths : readStoredPaths(),
  traveledPaths: readStoredTraveledPaths(),
  position:  localStorage.getItem("level") || "start",
  nodeTypes: readNodeTypes(),
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
      localStorage.setItem("level", "start")
      state.nodeTypes = calculateNodeTypes();
    },
    updateMap: (state, action) => {
      if(!state.traveledPaths.includes(action.payload)) state.traveledPaths.push(action.payload)
      state.position = action.payload;
      localStorage.setItem("level", state.position.toString())
      localStorage.setItem("traveledPaths", JSON.stringify(state.traveledPaths))
    },
    resetPosition: (state) => {
      state.position = "start";
      localStorage.setItem("level", "start")
      state.traveledPaths = [];
      localStorage.setItem("traveledPaths", JSON.stringify([]))
    }
  }
})

export const { resetMap, updateMap, resetPosition } = mapSlice.actions

export default mapSlice.reducer
