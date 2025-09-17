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

export const colorMap = {
  ANDROID: "yellow",
  IOS: "green",
  NODE_JS: "blue",
  RAILS: "red",
  REACT: "purple",
} as const;

export const statusMap = {
  BACKLOG: "Backlog",
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
  CANCELLED: "Cancelled",
  ALL: "All",
} as const;

export const tagMap = {
  REACT: "React",
  ANDROID: "Android",
  NODE_JS: "Node.js",
  IOS: "IOS",
  RAILS: "Rails",
};

export const userTypeMap = {
  CANDIDATE: "Candidate",
  ADMIN: "Admin",
};

export const mapDate = (dateString: string | undefined) => {
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

  if (isSameDay(date, today)) return "TODAY";
  if (isSameDay(date, yesterday)) return "YESTERDAY";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const getDateStatus = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const daysLeft = date.getDate() - today.getDate();
  return daysLeft < 0
    ? "text-primary bg-primary/10"
    : daysLeft == 0
      ? "text-secondary bg-secondary/10"
      : daysLeft <= 2
        ? "text-tertiary bg-tertiary/10"
        : "text-font";
};
