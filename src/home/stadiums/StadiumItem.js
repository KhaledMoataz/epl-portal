import React from 'react';

function StadiumItem(props) {
    return (
        <div>
            <div className="stadium-item">
                {`${props.stadium.name} (${props.stadium.rows} x ${props.stadium.cols})`}
            </div>
            <hr className="list-divider" />
        </div>
    );
}

export default StadiumItem;
