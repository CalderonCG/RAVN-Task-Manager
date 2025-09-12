import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { RiCalendarCheckLine } from "react-icons/ri";

//types---------------------------------------------
type CustomInputProps = {
  value?: string;
  onClick?: () => void;
  selectedDate: Date | null;
};

type DateProps = {
  selectedDate: Date | null;
  onChange: React.Dispatch<React.SetStateAction<Date | null>>;
};

const ExampleCustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, selectedDate, onClick }, ref) => (
    <button
      className="flex items-center justify-start gap-2 bg-modal-card-mobile py-2 px-4 rounded-sm w-full 
          lg:w-fit lg:justify-center lg:bg-modal-card"
      onClick={onClick}
      ref={ref}
    >
      <RiCalendarCheckLine className="text-xl" />
      {selectedDate === null ? "Due date" : value}
    </button>
  ),
);

ExampleCustomInput.displayName = "ExampleCustomInput";

function DateButton({ selectedDate, onChange }: DateProps) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => onChange(date)}
      customInput={<ExampleCustomInput selectedDate={selectedDate} />}
      dateFormat="MMM. dd yyyy" // Add this format
      popperClassName=""
      todayButton="Today"
      calendarClassName="!bg-background !border !border-font !rounded-sm"
      dayClassName={(date: Date) => {
        const isSelected =
          selectedDate && date.toDateString() === selectedDate.toDateString();
        return isSelected
          ? "!bg-primary !text-font"
          : "hover:!bg-primary !text-font";
      }}
      monthClassName={() => "!text-font"}
      weekDayClassName={() => "!text-font"}
    />
  );
}

export default DateButton;
