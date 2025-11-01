import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
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

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: assignments as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }: PayloadAction<Omit<Assignment, "_id">>) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        ...payload,
      };
      state.assignments.push(newAssignment);
    },

    deleteAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== payload
      );
    },

    updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload._id ? { ...a, ...payload } : a
      );
    },

    editAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload ? { ...a, editing: true } : a
      );
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
