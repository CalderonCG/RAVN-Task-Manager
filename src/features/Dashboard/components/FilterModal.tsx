import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import StatusDropdown from "../../AddTask/components/StatusDropdown";
import DateButton from "../../AddTask/components/DateButton";
import PointsDropdown from "../../AddTask/components/PointsDropdown";
import AssigneeDropdown from "../../AddTask/components/AssigneeDropdown";
import TagDropdown from "../../AddTask/components/TagDropdown";
import type { FilterType } from "../../../utils/TaskTypes";
import Button from "../../../components/Button/Button";
import { useDropdownData } from "../../AddTask/hooks/useDropdownData";
import { useFilterHandler } from "../hooks/useTaskFilters";

//Types----------------------------------------
type ModalProps = {
  isOpen: boolean;
  showAssignee: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: FilterType;
  setFilters: React.Dispatch<React.SetStateAction<Partial<FilterType>>>;
};

function FilterModal({
  isOpen,
  showAssignee,
  setIsOpen,
  setFilters,
}: ModalProps) {
  //Filter selection-------------------------------------------------------
  const { filters, actions } = useFilterHandler({ setIsOpen, setFilters });

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

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed items-end inset-0 flex w-screen lg:items-center justify-center lg:p-4 bg-black/50">
        <DialogPanel
          className="w-full lg:min-w-160 lg:w-fit lg:max-w-[50rem] space-y-2 bg-background-modal text-font py-8 px-4 rounded-t-lg lg:rounded-lg
            flex flex-col items-center justify-center gap-4 text-center"
        >
          <DialogTitle className="font-bold">Filter tasks</DialogTitle>
          <div className="flex w-full flex-col lg:flex-row lg:items-center gap-2 ">
            <PointsDropdown
              selectedValue={filters.selectedPoints}
              onSelect={actions.setSelectedPoints}
              isLoading={isLoading}
              hasError={!!errorPoints}
              options={dataPoints}
            />
            {showAssignee && (
              <AssigneeDropdown
                selectedValue={filters.selectedAssignee}
                onSelect={actions.setSelectedAssignee}
                isLoading={isLoading}
                hasError={!!errorUsers}
                options={dataUsers}
              />
            )}

            <TagDropdown
              selectedValue={filters.tags}
              onSelect={actions.tagsDispatcher}
              isLoading={isLoading}
              hasError={!!errorTags}
              options={dataTags}
            />

            <StatusDropdown
              isFilter={true}
              selectedValue={filters.selectedStatus}
              onSelect={actions.setSelectedStatus}
              isLoading={isLoading}
              hasError={!!errorStatus}
              options={dataStatus}
            />
            <DateButton
              selectedDate={filters.selectedDate}
              onChange={actions.setSelectedDate}
            />
          </div>
          <div className="flex gap-4 w-full justify-between lg:justify-end">
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => actions.handleApply()}>
              Apply
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default FilterModal;
