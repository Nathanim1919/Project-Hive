 export const changeDate = (date) => {
      const dt = new Date(date);
      const options = {
          month: "long",
          day: "numeric",
          year: "numeric"
      };
      const formattedDate = dt.toLocaleDateString("en-US", options);
      return formattedDate; // Output: "May 25, 2023"
  }

  export const howMuchDaysLeft = (startDateStr, dueDateStr) => {
      const startDate = new Date(startDateStr);
      const dueDate = new Date(dueDateStr);

      // Calculate the difference in milliseconds between the two dates
      const timeDiff = dueDate.getTime() - startDate.getTime();

      // Calculate the number of days left
      let daysLeft;
      if (timeDiff > 0) {
          daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
      } else {
          daysLeft = 0; // Due date has already passed
      }

      return daysLeft;
  }


  export const getCurrentDateFormat = () => {
      const currentDate = new Date();
      const options = {
          month: "long",
          year: "numeric"
      };
      const formattedDate = currentDate.toLocaleDateString("en-US", options);
      return formattedDate;
  }