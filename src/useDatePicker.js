import { useState } from "react";
import axios from "axios";

const useDatePicker = (endpoint, params) => {
  const [date, setDate] = useState(new Date());

  const submitDate = () => {
    axios
      .post(endpoint, { date, ...params })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return [date, setDate, submitDate];
};

export default useDatePicker;
