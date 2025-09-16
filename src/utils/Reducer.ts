import type { TaskTag } from "../generated/graphql";
import type { TagAction } from "./TaskTypes";

export const tagsReducer = (state: TaskTag[], action: TagAction): TaskTag[] => {
  switch (action.type) {
    case "Add":
      return [...state, action.value];
    case "Remove":
      return state.filter((tag) => tag != action.value);
    case "Reset":
      return [];
    default:
      return state;
  }
};
