import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  to, 
  onClick, 
  variant = 'primary', 
  className = '',
  type = 'button',
  fullWidth = false
}) => {
  
  const baseStyles = "relative inline-flex items-center justify-center font-display font-bold uppercase tracking-wider transition-all duration-300 px-8 py-3 text-lg group skew-btn";
  
  const variants = {
    primary: "bg-fde-purple text-white hover:bg-purple-700 border-2 border-transparent shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.8)]",
    outline: "bg-transparent text-white border-2 border-fde-purple hover:bg-fde-purple/20",
    ghost: "bg-transparent text-gray-300 hover:text-white border-2 border-transparent"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const content = (
    <span className="skew-btn-content flex items-center gap-2">
      {children}
    </span>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}>
      {content}
    </button>
  );
};

export default Button;