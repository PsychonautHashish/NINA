// /shared/components/Button.jsx
import React from 'react';

function Button({ label, onClick, style, className }) {
  return (
    <button className={`${className} ${style}`} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
