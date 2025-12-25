interface DecorativeBlobsProps {
  variant?: 'hero' | 'section' | 'footer';
}

const DecorativeBlobs = ({ variant = 'section' }: DecorativeBlobsProps) => {
  if (variant === 'hero') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Top right orange blob */}
        <div 
          className="absolute -top-20 -right-20 w-72 h-72 md:w-96 md:h-96 rounded-full bg-blob-orange/20 blur-3xl"
          style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
        />
        {/* Bottom left green blob */}
        <div 
          className="absolute -bottom-32 -left-20 w-64 h-64 md:w-80 md:h-80 rounded-full bg-blob-green/15 blur-3xl"
          style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
        />
        {/* Center right yellow blob */}
        <div 
          className="absolute top-1/2 -right-32 w-48 h-48 md:w-64 md:h-64 rounded-full bg-blob-yellow/20 blur-3xl"
          style={{ borderRadius: '50% 50% 40% 60% / 40% 60% 40% 60%' }}
        />
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Top left orange blob */}
        <div 
          className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-blob-orange/10 blur-3xl"
          style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
        />
        {/* Bottom right green blob */}
        <div 
          className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-blob-green/10 blur-3xl"
          style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Subtle accent blob */}
      <div 
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-blob-yellow/10 blur-3xl"
        style={{ borderRadius: '40% 60% 60% 40% / 60% 40% 60% 40%' }}
      />
    </div>
  );
};

export default DecorativeBlobs;
