import React from 'react';

const Item = (props) => {
    const oneItem = (
        <div className="row px-3 py-3">
            <div className="col">username</div>

            {props.columnNum === '1' ? (
                <>
                    <div>
                        <button className="btn btn-secondary" type="submit">
                            Cancel
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-primary" type="submit">
                            Accept
                        </button>
                    </div>
                </>
            ) : (
                <div className="col-3">
                    <button className="btn btn-danger" type="submit">
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
    return oneItem;
};

export default Item;
