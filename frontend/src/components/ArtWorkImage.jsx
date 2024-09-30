import React from 'react';

const ArtworkImage = ({ src, alt }) => {
  return (
    <div className="artwork-image">
      <img src={src} alt={alt} className="responsive-img" />
    </div>
  );
};

export default ArtworkImage;