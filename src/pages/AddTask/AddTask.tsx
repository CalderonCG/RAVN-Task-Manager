import { RiCloseLine } from "react-icons/ri";
import PointsDropdown from "../../features/AddTask/components/PointsDropdown";
import { useReducer, useState } from "react";
import AssigneeDropdown from "../../features/AddTask/components/AssigneeDropdown";
import TagDropdown from "../../features/AddTask/components/TagDropdown";
import DateButton from "../../features/AddTask/components/DateButton";

import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_POINTS, GET_TAGS, GET_USERS } from "../../queries/task";
import type {
  GetPointsQuery,
  GetTagsQuery,
  GetUsersQuery,
} from "../../generated/graphql";
import type {
  TagAction,
  User,
} from "../../features/AddTask/components/AddButton";

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
  //Queries--------------------------------------
  //Queries---------------------------------------------------------------------------------
  const { data: dataTags, loading: loadingTags } =
    useQuery<GetTagsQuery>(GET_TAGS);
  const { data: dataPoints, loading: loadingPoints } =
    useQuery<GetPointsQuery>(GET_POINTS);
  const { data: dataUsers, loading: loadingUsers } =
    useQuery<GetUsersQuery>(GET_USERS);

  //Selected states
  const [selectedAssignee, setSelectedAssignee] = useState<User | null>(null);
  const [selectedPoints, setSelectedPoints] = useState<number | undefined>(
    undefined,
  );
  const [tags, dispatch] = useReducer(tagsReducer, []);

  //Consts
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
        options={dataPoints}
        isLoading={loadingPoints}
      />
      <TagDropdown
        selectedValue={tags}
        onSelect={dispatch}
        options={dataTags}
        isLoading={loadingTags}
      />
      <AssigneeDropdown
        selectedValue={selectedAssignee}
        onSelect={setSelectedAssignee}
        options={dataUsers}
        isLoading={loadingUsers}
      />
      <DateButton />
    </div>
  );
}

export default AddTask;
