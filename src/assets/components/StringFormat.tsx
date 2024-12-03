import moment from "moment";

export const dateFormat = (date?: Date) => {
  return moment(date).format("D MMMM YYYY, HH:mm");
};
