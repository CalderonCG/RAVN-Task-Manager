import { Dialog, DialogPanel } from "@headlessui/react";
import { useEffect } from "react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import AssigneeDropdown from "./AssigneeDropdown";
import PointsDropdown from "./PointsDropdown";
import TagDropdown from "./TagDropdown";
import "react-datepicker/dist/react-datepicker.css";
import DateButton from "./DateButton";
import Button from "../../../components/Button/Button";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import type { GetTaskType } from "../../../utils/TaskTypes";
import StatusDropdown from "./StatusDropdown";
import { tagsReducer } from "../../../utils/Reducer";
import { Controller } from "react-hook-form";
import { useDropdownData } from "../hooks/useDropdownData";
import { useTaskForm } from "../hooks/useTaskForm";

//Types------------
type ModalProps =
  | {
      isOpen: boolean;
      type: "create";
      setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | {
      isOpen: boolean;
      type: "edit";
      task: GetTaskType;
      setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    };

function AddModal(props: ModalProps) {
  const { isOpen, type, setIsOpen } = props;

  //Queries---------------------------------------------------------------------------------

  const {
    dataPoints,
    errorPoints,
    dataStatus,
    errorStatus,
    dataTags,
    errorTags,
    dataUsers,
    errorUsers,
    isLoading,
  } = useDropdownData();

  //Form configuration ---------------------------------------------------------------
  const useFormProps =
    type === "create"
      ? { type: type, setIsOpen: setIsOpen }
      : { type: type, setIsOpen: setIsOpen, id: props.task.id };

  const {
    showSuccess,
    error,
    isDisabled,
    setIsDisabled,
    control,
    handleSubmit,
    errors,
    reset,
    onSubmit,
  } = useTaskForm(useFormProps);

  //UseEffect to map the inputs if in edit mode
  useEffect(() => {
    setIsDisabled(false);
    if (type === "edit" && isOpen && props.task) {
      const { task } = props;
      reset({
        taskName: task.name || "",
        selectedPoints: task.pointEstimate,
        selectedStatus: task.status,
        selectedDate: new Date(task.dueDate),
        selectedAssignee: task.assignee
          ? {
              __typename: "User",
              id: task.assignee.id,
              fullName: task.assignee.fullName,
            }
          : undefined,
        tags: task.tags || [],
      });
    } else if (type === "create" && isOpen) {
      reset({
        taskName: "",
        selectedStatus: "BACKLOG",
        selectedAssignee: undefined,
        selectedPoints: undefined,
        selectedDate: null,
        tags: [],
      });
    }
  }, [props, type, isOpen, reset, setIsDisabled]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed items-end inset-0 flex w-screen lg:items-center justify-center lg:p-4 bg-black/50">
        {showSuccess ? (
          <DialogPanel
            className="w-full lg:min-w-160 lg:w-fit lg:max-w-[50rem] space-y-2 bg-background-modal text-font py-8 px-4 rounded-t-lg lg:rounded-lg
            flex flex-col items-center justify-center gap-4 text-center"
          >
            <RiCheckboxCircleLine className="text-6xl" />
            <p className="text-lg font-bold">
              Task {type === "edit" ? "updated" : "created"} successfully
            </p>
          </DialogPanel>
        ) : error ? (
          <DialogPanel
            className="w-full lg:min-w-160 lg:w-fit lg:max-w-[50rem] space-y-2 bg-background-modal text-font py-8 px-4 rounded-t-lg lg:rounded-lg
            flex flex-col items-center justify-center gap-4 text-center"
          >
            <ErrorMessage message={error} />
          </DialogPanel>
        ) : (
          <DialogPanel
            className="w-full lg:min-w-160 lg:w-fit lg:max-w-[50rem] h-full lg:h-auto space-y-2 bg-background lg:bg-background-modal text-font py-8 px-4 rounded-t-lg lg:rounded-lg
            flex flex-col items-center justify-start lg:justify-center gap-4 text-center "
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <div className="gap-8 flex lg:hidden justify-between">
                <Button
                  variant="neutral"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  Cancel
                </Button>

                <Button variant="neutral" type="submit" disabled={isDisabled}>
                  {type === "create" ? "Create" : "Update"}
                </Button>
              </div>
              <Controller
                name="taskName"
                control={control}
                rules={{
                  required: "Task name is required",
                  validate: {
                    notEmpty: (value) =>
                      value.trim().length > 0 ||
                      "Task name cannot be empty or only spaces",
                  },
                  maxLength: {
                    value: 15,
                    message: "Task name must be 15 characters or less",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Task Name..."
                    className="w-full p-2 text-xl font-semibold"
                  />
                )}
              />

              <div className="flex flex-col w-full lg:flex-row gap-4">
                {/* Points Dropdown */}
                <Controller
                  name="selectedPoints"
                  control={control}
                  rules={{ required: "Points estimate is required" }}
                  render={({ field }) => (
                    <PointsDropdown
                      selectedValue={field.value}
                      onSelect={field.onChange}
                      isLoading={isLoading}
                      hasError={!!errorPoints}
                      options={dataPoints}
                    />
                  )}
                />

                {/* Assignee Dropdown */}
                <Controller
                  name="selectedAssignee"
                  control={control}
                  rules={{ required: "Assignee is required" }}
                  render={({ field }) => (
                    <AssigneeDropdown
                      selectedValue={field.value}
                      onSelect={field.onChange}
                      isLoading={isLoading}
                      hasError={!!errorUsers}
                      options={dataUsers}
                    />
                  )}
                />

                {/* Tag Dropdown */}
                <Controller
                  name="tags"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value.length > 0 || "At least one tag is required",
                  }}
                  render={({ field }) => (
                    <TagDropdown
                      selectedValue={field.value}
                      onSelect={(action) => {
                        const newTags = tagsReducer(field.value, action);
                        field.onChange(newTags);
                      }}
                      isLoading={isLoading}
                      hasError={!!errorTags}
                      options={dataTags}
                    />
                  )}
                />

                {/* Status Dropdown */}
                {type === "edit" && (
                  <Controller
                    name="selectedStatus"
                    control={control}
                    render={({ field }) => (
                      <StatusDropdown
                        selectedValue={field.value}
                        onSelect={field.onChange}
                        isLoading={isLoading}
                        hasError={!!errorStatus}
                        options={dataStatus}
                      />
                    )}
                  />
                )}

                {/* Date Button */}
                <Controller
                  name="selectedDate"
                  control={control}
                  rules={{
                    required: "Due date is required",
                    validate: {
                      notPastDate: (value) => {
                        if (!value) return true;

                        const today = new Date();
                        today.setHours(0, 0, 0, 0); // Ignores the time and only compares the day

                        const selectedDate = new Date(value);
                        selectedDate.setHours(0, 0, 0, 0);

                        return (
                          selectedDate >= today ||
                          "Due date cannot be in the past"
                        );
                      },
                    },
                  }}
                  render={({ field }) => (
                    <DateButton
                      selectedDate={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="w-full flex justify-end items-center">
                {/* Validation errors */}
                {Object.keys(errors).length > 0 && (
                  <p className="text-primary flex-1">
                    {Object.values(errors)[0]?.message}
                  </p>
                )}

                <div className="gap-8 hidden lg:flex">
                  <Button
                    variant="neutral"
                    onClick={() => setIsOpen(false)}
                    type="button"
                  >
                    Cancel
                  </Button>

                  <Button variant="primary" type="submit" disabled={isDisabled}>
                    {type === "create" ? "Create" : "Update"}
                  </Button>
                </div>
              </div>
            </form>
          </DialogPanel>
        )}
      </div>
    </Dialog>
  );
}

export default AddModal;
