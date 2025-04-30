import React from 'react';

const OptimizedImage = ({ imageUrl, alt, className }) => {
  const optimizeCloudinaryUrl = (url) => {
    if (!url.includes('cloudinary')) return url;
    return url.replace('/upload/v', '/upload/w_500,f_auto,q_auto,c_scale/v');
  };

  return (
    <div
      className={className}
      style={{ backgroundImage: `url(${optimizeCloudinaryUrl(imageUrl)})` }}
      role="img"
      aria-label={alt}
    />
  );
};

export default OptimizedImage;