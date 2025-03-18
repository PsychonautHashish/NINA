// /shared/components/Input.jsx
import React from 'react';

function Input({ placeholder, type = "text", value, onChange, className }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
}

export default Input;
