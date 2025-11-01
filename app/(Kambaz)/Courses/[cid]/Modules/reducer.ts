import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

interface Lesson {
  _id: string;
  name: string;
}

interface Module {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: modules as Module[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, { payload }: PayloadAction<Omit<Module, "_id" | "lessons">>) => {
      const newModule: Module = {
        _id: uuidv4(),
        lessons: [],
        name: payload.name,
        course: payload.course,
      };
      state.modules.push(newModule);
    },

    deleteModule: (state, { payload }: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== payload);
    },

    updateModule: (state, { payload }: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === payload._id ? { ...m, ...payload } : m
      );
    },

    editModule: (state, { payload }: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === payload ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;

export default modulesSlice.reducer;
