import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Enrollment {
  user: string;
  course: string;
}

interface EnrollmentState {
  userEnrollments: Enrollment[];
}

const initialState: EnrollmentState = {
  userEnrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollmentsReducer",
  initialState,
  reducers: {
    enrollCourse: (state, action: PayloadAction<Enrollment>) => {
      const { user, course } = action.payload;
      const already = state.userEnrollments.some(
        (e) => e.user === user && e.course === course
      );
      if (!already) {
        state.userEnrollments.push({ user, course });
      }
    },

    unenrollCourse: (state, action: PayloadAction<Enrollment>) => {
      const { user, course } = action.payload;
      state.userEnrollments = state.userEnrollments.filter(
        (e) => !(e.user === user && e.course === course)
      );
      state.userEnrollments = [...state.userEnrollments];
    },

    clearEnrollments: (state) => {
      state.userEnrollments = [];
    },

    setUserEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.userEnrollments = action.payload ?? [];
    },
  },
});

export const {
  enrollCourse,
  unenrollCourse,
  clearEnrollments,
  setUserEnrollments,
} = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;
