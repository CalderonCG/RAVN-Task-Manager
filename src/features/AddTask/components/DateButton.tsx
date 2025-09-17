import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import {
  RiCalendarCheckLine,
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowRightDoubleLine,
} from "react-icons/ri";
import { format } from "date-fns";
import "./DateButton.module.css";

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
      dateFormat="MMM. dd yyyy"
      popperClassName=""
      todayButton="Today"
      calendarClassName="!bg-background !border !border-font !rounded-sm custom-datepicker-no-header-padding"
      dayClassName={(date: Date) => {
        const isSelected =
          selectedDate && date.toDateString() === selectedDate.toDateString();
        return isSelected
          ? "!bg-primary !text-font"
          : "hover:!bg-primary !text-font";
      }}
      monthClassName={() => "!text-font"}
      weekDayClassName={() => "!text-font"}
      renderCustomHeader={({
        monthDate,
        decreaseMonth,
        increaseMonth,
        decreaseYear,
        increaseYear,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
        prevYearButtonDisabled,
        nextYearButtonDisabled,
      }) => (
        <div className="flex items-center justify-between px-4 py-0 w-full">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={decreaseYear}
              disabled={prevYearButtonDisabled}
              className="p-1 hover:bg-primary rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RiArrowLeftDoubleLine className="text-font text-lg" />
            </button>
            <button
              type="button"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="p-1 hover:bg-primary rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RiArrowLeftSLine className="text-font text-lg" />
            </button>
          </div>

          <span className="text-font font-semibold text-lg">
            {format(monthDate, "MMMM yyyy")}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="p-1 hover:bg-primary rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RiArrowRightSLine className="text-font text-lg" />
            </button>
            <button
              type="button"
              onClick={increaseYear}
              disabled={nextYearButtonDisabled}
              className="p-1 hover:bg-primary rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RiArrowRightDoubleLine className="text-font text-lg" />
            </button>
          </div>
        </div>
      )}
    />
  );
}

export default DateButton;
