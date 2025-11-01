"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";

export interface Course {
  _id: string;
  name: string;
  number?: string;         
  description?: string; 
  image?: string;
  startDate?: string;
  endDate?: string;
  term?: string;
  instructor?: string;
}

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: courses as Course[],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload }: PayloadAction<Omit<Course, "_id">>) => {
      const newCourse: Course = { ...payload, _id: uuidv4() };
      state.courses.push(newCourse);
    },

    deleteCourse: (state, { payload }: PayloadAction<string>) => {
      state.courses = state.courses.filter((c) => c._id !== payload);
    },

    updateCourse: (state, { payload }: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) =>
        c._id === payload._id ? { ...c, ...payload } : c
      );
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;

export default coursesSlice.reducer;
