import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../../queries/UserQuery";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import type {
  GetProfileQuery,
  GetTaskQueryVariables,
  UserType,
} from "../../generated/graphql";
import { mapDate, numberMap, userTypeMap } from "../../utils/DataMapper";
import { avatarGenerator } from "../../utils/AvatarGenerator";
import Button from "../../components/Button/Button";
import { RiEdit2Line } from "react-icons/ri";
import { useTaskData } from "../../features/Dashboard/hooks/useTaskData";
import Card from "../../features/Dashboard/components/Card";
import ListHeader from "../../features/TaskList/components/ListHeader";

function User() {
  //Queries--------------------------
  //Get user data query
  const {
    data: userData,
    loading,
    error,
  } = useQuery<GetProfileQuery>(GET_PROFILE);

  //Applied filters
  const filterInput: GetTaskQueryVariables = {
    input: {
      assigneeId: userData?.profile.id,
      status: "DONE",
    },
  };

  //Task data
  const { data, isLoading, errorMessage } = useTaskData(
    filterInput,
    loading,
    error?.message,
  );

  const sortedTasks = data?.tasks
    .slice()
    .sort((a, b) => numberMap[b.pointEstimate] - numberMap[a.pointEstimate]);

  //Error message
  const message = error?.message ?? errorMessage;
  return (
    <div
      className="w-full flex-1 overflow-auto flex flex-col justify-center lg:items-start items-center text-font gap-4 px-4 py-4 lg:py-0 lg:px-8
      "
    >
      {loading || isLoading ? (
        <Loader />
      ) : message ? (
        <ErrorMessage message={message} />
      ) : (
        <div className="w-full flex flex-col lg:flex-row gap-4 overflow-y-auto">
          <div
            className="w-full lg:w-1/4 lg:py-16 lg:h-full bg-background-secondary p-8 flex flex-col items-center justify-between gap-8 rounded-xl
          lg:px-4"
          >
            <div className="w-full   flex flex-col items-center gap-4 text-center">
              <img
                src={avatarGenerator(userData?.profile.id)}
                alt="Avatar"
                className="w-50 lg:w-72 lg:object-contain rounded-full"
              />
              <h1 className="text-xl lg:text-2xl font-semibold">
                {userData?.profile.fullName}
              </h1>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="flex w-full  justify-between lg:justify-start lg:gap-2">
                <p className="font-semibold text-font-secondary">Email:</p>
                <p>{userData?.profile.email}</p>
              </div>
              <div className="flex w-full justify-between lg:justify-start lg:gap-2">
                <p className="font-semibold text-font-secondary">Type:</p>
                <p>{userTypeMap[userData?.profile.type as UserType]}</p>
              </div>
              <div className="flex w-full justify-between lg:justify-start lg:gap-2">
                <p className="font-semibold text-font-secondary">Created at:</p>
                <p>{mapDate(userData?.profile.createdAt, false)}</p>
              </div>
              <div className="flex w-full justify-between lg:justify-start lg:gap-2">
                <p className="font-semibold text-font-secondary">Updated at:</p>
                <p>{mapDate(userData?.profile.updatedAt, false)}</p>
              </div>
              <Button variant="primary">
                <RiEdit2Line />
                <p></p>
                Edit profile
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-3/4 lg:h-full bg-background-secondary lg:py-8  p-4 flex flex-col items-start gap-8 rounded-xl">
            <div className="flex flex-col gap-4">
              <h1 className="text-font-secondary text-lg">Description</h1>
              <div className="rounded-xl lg:h-48 border-background-modal border-1 p-4">
                <p>
                  Hi, I’m a passionate Front-End Developer specializing in
                  building dynamic, user-friendly applications with React.js. I
                  enjoy turning complex problems into simple, intuitive
                  solutions and crafting seamless user experiences.
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full gap-4">
              <h1 className="text-font-secondary text-lg">
                Highest rated completed tasks
              </h1>
              <div className="rounded-xl w-full   lg:h-auto border-background-modal border-1 overflow-x-scroll lg:overflow-auto">
                <ListHeader />
                {sortedTasks?.slice(0, 3).map((task) => (
                  <Card task={task} variant="list" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
