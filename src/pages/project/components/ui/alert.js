import React from 'react';

export const Alert = ({ children, className, ...props }) => {
  return (
    <div
      className={`p-4 border-l-4 border-blue-500 bg-blue-100 text-blue-700 ${className}`}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertDescription = ({ children, className, ...props }) => {
  return (
    <p className={`text-sm ${className}`} {...props}>
      {children}
    </p>
  );
};