import React from 'react';

const OptimizedImageLarge = ({ imageUrl, alt, className, style, onClick}) => {
  const optimizeUrl = (url) => {
    if (!url.includes('cloudinary')) return url;
    return url.replace('/upload/v', '/upload/w_800,f_auto,q_auto,c_scale/v');
  };

  return (
    <img 
      src={optimizeUrl(imageUrl)}
      alt={alt}
      className={className}
      style={style}
      onClick={onClick}
    />
  );
};

export default OptimizedImageLarge;