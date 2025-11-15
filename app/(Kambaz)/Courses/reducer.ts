"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courses as dbCourses } from "../Database";
import { v4 as uuidv4 } from "uuid";

export type Course = {
  _id: string;
  name: string;
  description: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
};

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: dbCourses as Course[],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload }: PayloadAction<Course>) => {
      const newCourse = { ...payload, _id: uuidv4() };
      state.courses = [...state.courses, newCourse];
    },

    deleteCourse: (state, { payload }: PayloadAction<string>) => {
      state.courses = state.courses.filter(
        (course) => course._id !== payload
      );
    },

    updateCourse: (state, { payload }: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) =>
        c._id === payload._id ? payload : c
      );
    },

    setCourses: (state, { payload }: PayloadAction<Course[]>) => {
      state.courses = payload;
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;