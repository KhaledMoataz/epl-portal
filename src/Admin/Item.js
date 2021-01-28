import React from 'react';

const Item = (props) => {
    const oneItem = (
        <div className="row px-3 py-3">
            <div className="col-7">{props.username}</div>

            {props.columnNum === '1' ? (
                <>
                    <div>
                        <button onClick={props.Cancel} className="btn btn-secondary" type="button">
                            Cancel
                        </button>
                    </div>
                    <div className="col">
                        <button onClick={props.Accept} className="btn btn-primary" type="button">
                            Accept
                        </button>
                    </div>
                </>
            ) : (
                <div className="col">
                    <button onClick={props.Delete} className="btn btn-danger" type="button">
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
    return oneItem;
};

export default Item;
