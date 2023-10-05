import { format } from "date-fns";

const formatMessageDate = (messageDate) => {
  const formattedMonthDate = format(new Date(messageDate), "PP").split(",")[0];

  const formattedHourDate = format(new Date(messageDate), "p");

  const formatedDate = formattedMonthDate + ", " + formattedHourDate;

  return formatedDate;
};

export default formatMessageDate;
