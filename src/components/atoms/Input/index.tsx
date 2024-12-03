import React, { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<InputProps> = ({ label, ...props }) => {
  return (
    <>
      {label && <label className="input-label mr-2.5">{label}</label>}
      <input className="
        border-none outline-none 
        flex-1 bg-transparent 
        text-white border-b 
        border-white" {...props} />
    </>
  );
};

export default Input;