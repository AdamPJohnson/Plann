import React, { useState } from "react";

type formElement = HTMLInputElement | HTMLTextAreaElement;

const useForm = (
  inputs: Record<string, string | number>
): [Record<string, string | number>, React.ChangeEventHandler<formElement>] => {
  const [formData, setFormData] = useState(inputs);
  const onChange = (e: React.ChangeEvent<formElement>) => {
    const target = e.target as formElement;
    const newFormData = { ...formData };
    newFormData[target.name] = e.target.value;
    setFormData(newFormData);
  };

  return [formData, onChange];
};

export default useForm;
