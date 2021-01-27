import React from 'react';

/*  Each Item is form group consist of 3 elemets
        1- icon             --> It presents icon for each item
        2- editedElement    --> It presents the edited element e.g. date, text, password ..etc
        3- invalidMessage   --> It presents error message in case there is an error
    The item have 4 different cases
        1- gender           --> it's a special case because it has specific values(Male/Female)
        2- role             --> it's a special case because it has specific values(Fan/Manager)
        3- address          --> it's a special case becuase it's not required
        4- email/username   --> it's a special case becuase it's readOnly
        5- others           --> all elements that are required and don't have specific values
*/

const Item = (props) => {
    let editedElement;
    let isRequired = 'required';

    if (props.type === 'gender') {
        editedElement = (
            <select
                value={props.value}
                name={props.name}
                className="custom-select"
                onChange={props.onChange}>
                <option value="Male" defaultValue>
                    Male
                </option>
                <option value="Female">Female</option>
            </select>
        );
    } else if (props.type === 'role') {
        editedElement = (
            <select
                value={props.value}
                name={props.name}
                disabled
                className="custom-select"
                onChange={props.onChange}>
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
                value={props.value}
            />
        );
    } else if (props.type === 'email' || props.type === 'username') {
        editedElement = (
            <input
                name={props.name}
                onChange={props.onChange}
                type={props.type}
                readOnly
                placeholder={props.placeholder}
                className={`form-control ${props.validation}`}
                value={props.value}
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
                value={props.value}
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
};

export default Item;
