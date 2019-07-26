import React from 'react';
import './Track.scss';

const Track = () => (
    <div className="bg__container">
      <div className="bg__sky">
        <div className="bg__cloud"></div>
        <div className="bg__cloud"></div>
        <div className="bg__cloud"></div>
      </div>
      <div className="bg__backTrack"></div>
      <div className="bg__backFence"></div>
      <div className="bg__infield"></div>
      <div className="bg__track">
        <span className="bg__finish-line"></span>
      </div>
    </div>
);

export default Track;