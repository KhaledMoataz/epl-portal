import React from 'react';

const Loading = ({ isShown }) =>
    isShown ? (
        <div className="text-center">
            <div className="m-5 spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    ) : null;

export default Loading;
