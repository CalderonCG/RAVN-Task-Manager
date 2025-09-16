import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../../queries/UserQuery";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import type { GetProfileQuery } from "../../generated/graphql";
import { mapDate } from "../../utils/DataMapper";

function User() {
  const { data, loading, error } = useQuery<GetProfileQuery>(GET_PROFILE);
  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center text-font gap-4 py-4 px-4 lg:px-8
      "
    >
      <div className="w-full lg:w-1/2 bg-background-secondary p-8 flex flex-col lg:flex-row items-center justify-between gap-8 rounded-xl">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error.message} />
        ) : (
          <>
            <div className="w-full flex flex-col items-center gap-4">
              <img
                src="/Avatar.png"
                alt="Avatar"
                className="w-50 lg:w-64 lg:object-contain rounded-full"
              />
              <h1 className="text-xl font-semibold">
                {data?.profile.fullName}
              </h1>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="flex w-full  justify-between lg:justify-start lg:gap-4">
                <p className="font-semibold text-font-secondary">Email:</p>
                <p>{data?.profile.email}</p>
              </div>
              <div className="flex w-full justify-between lg:justify-start lg:gap-4">
                <p className="font-semibold text-font-secondary">Type:</p>
                <p>{data?.profile.type}</p>
              </div>
              <div className="flex w-full justify-between lg:justify-start lg:gap-4">
                <p className="font-semibold text-font-secondary">Created at:</p>
                <p>{mapDate(data?.profile.createdAt)}</p>
              </div>
              <div className="flex w-full justify-between lg:justify-start lg:gap-4">
                <p className="font-semibold text-font-secondary">Updated at:</p>
                <p>{mapDate(data?.profile.updatedAt)}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default User;
