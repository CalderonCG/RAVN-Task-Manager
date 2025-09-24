//Maps number string to number
export const numberMap = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
} as const;

//Assigns a tag color depending on the
export const colorMap = {
  ANDROID: "yellow",
  IOS: "green",
  NODE_JS: "blue",
  RAILS: "red",
  REACT: "purple",
} as const;

//Maps the enum string of the status
export const statusMap = {
  BACKLOG: "Backlog",
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
  CANCELLED: "Cancelled",
  ALL: "All",
} as const;

//Maps the enum string of the tags
export const tagMap = {
  REACT: "React",
  ANDROID: "Android",
  NODE_JS: "Node.js",
  IOS: "IOS",
  RAILS: "Rails",
};

//Maps the enum string of the user type
export const userTypeMap = {
  CANDIDATE: "Candidate",
  ADMIN: "Admin",
};

//Transform the date into a readable format, and assigns 'today' or 'yesterday' if applies
export const mapDate = (
  dateString: string | undefined,
  capitalize: boolean,
) => {
  if (dateString === undefined) {
    return "unknown";
  }
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (date1: Date, date2: Date) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  if (isSameDay(date, today)) return `${capitalize ? "TODAY" : "Today"}`;
  if (isSameDay(date, yesterday))
    return `${capitalize ? "YESTERDAY" : "Yesterday"}`;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

//Sends date status compared to the actual date
export const getDateStatus = (dateString: string, background: boolean) => {
  const date = new Date(dateString);
  const today = new Date();
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Compare the complete date
  const daysLeft = Math.floor(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  return daysLeft < 0
    ? `text-primary ${background ? "bg-primary" : ""}`
    : daysLeft == 0
      ? `text-secondary ${background ? "bg-secondary" : ""}`
      : daysLeft <= 2
        ? `text-tertiary ${background ? "bg-tertiary" : ""}`
        : "text-font";
};
