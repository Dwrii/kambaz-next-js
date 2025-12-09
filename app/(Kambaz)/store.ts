"use client"
import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import enrollmentsReducer from "./Courses/Enrollments/reducer";

import helloReducer from "../Labs/Lab4/ReduxExamples/HelloRedux/helloReducer";
import counterReducer from "../Labs/Lab4/ReduxExamples/CounterRedux/counterReducer";
import addReducer from "../Labs/Lab4/ReduxExamples/AddRedux/addReducer";
import todosReducer from "../Labs/Lab4/ReduxExamples/todos/todosReducer";

const store = configureStore({
 reducer: { 
    helloReducer,
    counterReducer,
    addReducer,
    todosReducer,

    coursesReducer, 
    modulesReducer, 
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
},
});
export default store;
export type RootState = ReturnType<typeof store.getState>;