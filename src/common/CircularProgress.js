import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

const CircularProgress = ({ progress }) => (
    <div className="reservation_percentage">
        <CircularProgressbar
            className="reservation_percentage"
            value={progress}
            text={`${progress}%`}
        />
    </div>
);

export default CircularProgress;
