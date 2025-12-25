interface SparkleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Sparkle = ({ className = '', size = 'md' }: SparkleProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 24 24" 
      fill="none"
      aria-hidden="true"
    >
      <path 
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" 
        fill="currentColor"
      />
    </svg>
  );
};

export default Sparkle;
