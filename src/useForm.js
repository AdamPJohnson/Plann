import { useState } from "react";

const useForm = (inputs) => {
  const [formData, setFormData] = useState(inputs);
  const onChange = (e) => {
    const newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  return [formData, onChange];
};

export default useForm;
 