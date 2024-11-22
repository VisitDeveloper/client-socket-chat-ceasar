/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { useState } from 'react';

// interface Validation {
//   required?: {
//     value: boolean;
//     message: string;
//   };
//   pattern?: {
//     value: string;
//     message: string;
//   };
//   custom?: {
//     isValid: (value: string) => boolean;
//     message: string;
//   };
// }



export const useForm = (options) => {
  const [data, setData] = useState((options?.initialValues || {}) );
  const [errors, setErrors] = useState({});

  // Needs to extend unknown so we can add a generic to an arrow function
  const handleChange = (
    key,
    sanitizeFn
  ) => (e) => {
    const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors = {};
      for (const key in validations) {
        // console.log('validations key' , key , validations)
        const value = data[key];
        // console.log('value' , value)
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }


        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
  };
};