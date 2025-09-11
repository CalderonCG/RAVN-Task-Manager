import { RiCloseLine } from "react-icons/ri";
import PointsDropdown from "../../features/AddTask/components/PointsDropdown";
import { useReducer, useState } from "react";
import AssigneeDropdown from "../../features/AddTask/components/AssigneeDropdown";
import TagDropdown from "../../features/AddTask/components/TagDropdown";
import DateButton from "../../features/AddTask/components/DateButton";

import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
//Types------------
type User = {
  id: string;
  name: string;
  avatar: string;
};

export type TagAction = {
  type: "Add" | "Remove";
  value: string;
};

//Reducer-----------------
const tagsReducer = (state: string[], action: TagAction) => {
  switch (action.type) {
    case "Add":
      return [...state, action.value];
    case "Remove":
      return state.filter((tag) => tag != action.value);
    default:
      return state;
  }
};
function AddTask() {
  const [selectedAssignee, setSelectedAssignee] = useState<User | null>(null);
  const [selectedPoints, setSelectedPoints] = useState<number | undefined>(
    undefined,
  );
  const [tags, dispatch] = useReducer(tagsReducer, []);
  const navigate = useNavigate();

  return (
    <div className="h-full w-full p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center text-font-secondary">
        <Button variant="neutral" onClick={() => navigate(-1)}>
          <RiCloseLine className="text-3xl text-font" />
        </Button>
        <Button variant="neutral">
          <p>Create</p>
        </Button>
      </div>
      <input
        type="text"
        placeholder="Task Name..."
        className="w-full p-2 text-xl font-semibold"
      />
      <PointsDropdown
        selectedValue={selectedPoints}
        onSelect={setSelectedPoints}
      />
      <TagDropdown selectedValue={tags} onSelect={dispatch} />
      <AssigneeDropdown
        selectedValue={selectedAssignee}
        onSelect={setSelectedAssignee}
      />
      <DateButton />
    </div>
  );
}

export default AddTask;
