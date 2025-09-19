import { RiErrorWarningLine } from "react-icons/ri";

//Types-------------------------
type ErrorProps = {
  message: string;
};

function ErrorMessage({ message }: ErrorProps) {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center font-bold text-font-secondary text-xl">
      <RiErrorWarningLine className="text-4xl" />
      <p>Something went wrong:</p>
      <p className="font-normal text-center">{message}</p>
    </div>
  );
}

export default ErrorMessage;
