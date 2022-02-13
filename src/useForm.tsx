import React, { useState } from "react";

const useForm = (
  inputs: Record<string, string>
): [
  Record<string, string>,
  React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
] => {
  const [formData, setFormData] = useState(inputs);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const newFormData = { ...formData };
    newFormData[target.name] = e.target.value;
    setFormData(newFormData);
  };

  return [formData, onChange];
};

export default useForm;
