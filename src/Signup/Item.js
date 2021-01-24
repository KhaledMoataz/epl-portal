import React from 'react';

function Item(props) {
    let editedElement;
    let isRequired = 'required';

    if (props.type === 'gender') {
        editedElement = (
            <select name={props.name} className="custom-select" onChange={props.onChange}>
                <option value="Male" defaultValue>
                    Male
                </option>
                <option value="Female">Female</option>
            </select>
        );
    } else if (props.type === 'role') {
        editedElement = (
            <select name={props.name} className="custom-select" onChange={props.onChange}>
                <option value="Fan" defaultValue>
                    Fan
                </option>
                <option value="Manager">Manager</option>
            </select>
        );
    } else if (props.type === 'address') {
        isRequired = '';
        editedElement = (
            <input
                name={props.name}
                onChange={props.onChange}
                type={props.type}
                placeholder={props.placeholder}
                className="form-control"
            />
        );
    } else {
        editedElement = (
            <input
                name={props.name}
                onChange={props.onChange}
                type={props.type}
                required
                placeholder={props.placeholder}
                className={`form-control ${props.validation}`}
            />
        );
    }

    const icon = (
        <div className="input-group-prepend">
            <span className="input-group-text control-span">
                <i className={props.item} />
            </span>
        </div>
    );

    const oneItem = (
        <div className={`form-group input-group ${isRequired}`}>
            {icon}
            {editedElement}
            <div className="invalid-feedback">{props.invalid_message}</div>
        </div>
    );
    return oneItem;
}

export default Item;
