export const extractDate = (date) => {
    const dateObj = new Date(date);
    const options = {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    return formattedDate;
  };