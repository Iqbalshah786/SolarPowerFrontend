import { format, parseISO } from "date-fns";
const formatDate = (dateString) => {
  if (!dateString) {
    return "Date not available";
  }
  try {
    const date = parseISO(dateString);
    return format(date, "MMMM do, yyyy h:mm a");
  } catch (error) {
    console.error("Invalid date string:", dateString);
    return "Invalid date";
  }
};
export default formatDate;
