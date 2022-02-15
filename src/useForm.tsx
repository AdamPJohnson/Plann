import React, { useState } from "react";

type formElement = HTMLInputElement | HTMLTextAreaElement;

function useForm(
  inputs: Record<string, string>
): [Record<string, string>, React.ChangeEventHandler<formElement>] {
  const [formData, setFormData] = useState(inputs);
  const onChange = (e: React.ChangeEvent<formElement>) => {
    const target = e.target;
    const newFormData = { ...formData };
    newFormData[target.name] = e.target.value;
    setFormData(newFormData);
  };

  return [formData, onChange];
}

export default useForm;
