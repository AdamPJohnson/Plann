import React, { useState } from "react";

const useForm = <T extends object>(
  inputs: T
): [T, React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>] => {
  const [formData, setFormData] = useState(inputs);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const newFormData = { ...formData };
    (newFormData as any)[target.name] = e.target.value;
    setFormData(newFormData);
  };

  return [formData, onChange];
};

export default useForm;
