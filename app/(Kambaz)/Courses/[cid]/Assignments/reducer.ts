import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Assignment {
  _id: string;
  title: string;
  description: string;
  course: string;
  points: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
  editing?: boolean;
}

const initialState = {
  assignments: [] as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, { payload }) => {
      state.assignments = payload;
    },

    addAssignment: (state, { payload: a }: { payload: Assignment }) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        title: a.title,
        description: a.description,
        course: a.course,
        points: a.points,
        dueDate: a.dueDate,
        availableFrom: a.availableFrom,
        availableUntil: a.availableUntil,
      };
      state.assignments = [...state.assignments, newAssignment];
    },

    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(a => a._id !== assignmentId);
    },

    updateAssignment: (state, { payload: updated }) => {
      state.assignments = state.assignments.map(a =>
        a._id === updated._id ? { ...a, ...updated } : a
      );
    },

    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map(a =>
        a._id === assignmentId ? { ...a, editing: true } : a
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;