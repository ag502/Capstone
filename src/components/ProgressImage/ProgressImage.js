import React from 'react';
import './Progress.css';

const ProgressImage = ({ modelType }) => {
  let backgroundImage = '';

  if (modelType === 'null') {
    backgroundImage = 'null';
  } else if (modelType === 'FaceAPI') {
    backgroundImage = 'faceApi';
  } else if (modelType === 'EmotionDetection') {
    backgroundImage = 'emotions';
  } else if (modelType === 'Shadowing') {
    backgroundImage = 'monalisa';
  }

  return (
    <div className="img-loader">
      <div
        style={{
          backgroundImage: `url(/images/models/${backgroundImage}.png)`
        }}
      />
    </div>
  );
};

export default ProgressImage;
