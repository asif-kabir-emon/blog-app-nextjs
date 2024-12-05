export const Months = [
  { value: "Null", label: "Month" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

// From currentYear to 50 years back in time
const currentYear = new Date().getFullYear();
const yearRange = Array.from({ length: 101 }, (_, i) => currentYear - i).map(
  (year) => ({
    value: year.toString(),
    label: year.toString(),
  }),
);

export const Years = [{ value: "Null", label: "Year" }, ...yearRange];
