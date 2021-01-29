import React from 'react';

const Item = (props) => {
    const oneItem = (
        <div className="row px-3 py-3 border">
            <h4 className="col-7">{props.username}</h4>

            {props.columnNum === '1' ? (
                <>
                    <div className="col text-right">
                        <button
                            onClick={() => props.Delete(props.username, 0)}
                            className="btn btn-secondary"
                            type="button">
                            Cancel
                        </button>
                    </div>
                    <div className="col text-right">
                        <button
                            onClick={() => props.Acception(props.username)}
                            className="btn btn-primary"
                            type="button">
                            Accept
                        </button>
                    </div>
                </>
            ) : (
                <div className="col text-right">
                    <button
                        onClick={() => props.Delete(props.username, 1)}
                        className="btn btn-danger"
                        type="button">
                        Delete {props.role}
                    </button>
                </div>
            )}
        </div>
    );
    return oneItem;
};

export default Item;
