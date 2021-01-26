import React from 'react';
import Item from './Item';

/*  The Form Component consists of 10 Items and 1 Button
    The 10 Items are:
        new_password, confirm_password, first_name, last_name, birthdate,
        gender, city, address, email, role
    each item has its own properties:
        1- name:            unique name for this item
        2- onChange:        function to control the item when its value changes
        3- item:            icon th preappend it in the item
        4- type:            the input type for this item e.g. text, password, date ... etc
        5- placeholder:     message to be shown inside the input if empty
        6- invalid_message  the message to be shown below the item if typed invalid input
        7- validation       when 'is-invalid' it shows error message below this item
*/

const PassFormComponent = (props) => (
    <form className="form-data" onSubmit={props.submitHandler}>
        <Item
            name="old_password"
            onChange={props.changeHandler}
            item="fa fa-lock fa-fw"
            type="password"
            placeholder="Old password"
            invalid_message={props.old_pass_message}
            validation={props.old_pass_message ? 'is-invalid' : ''}
        />

        <Item
            name="new_password"
            onChange={props.changeHandler}
            item="fa fa-lock fa-fw"
            type="password"
            placeholder="New password"
            invalid_message={props.new_pass_message}
            validation={props.new_pass_message ? 'is-invalid' : ''}
        />

        <Item
            name="confirm_new_password"
            onChange={props.changeHandler}
            item="fa fa-lock fa-fw"
            type="password"
            placeholder="Confirm new password"
            invalid_message={props.new_pass_message}
            validation={props.new_pass_message ? 'is-invalid' : ''}
        />

        <div className="form-group input-group text-center">
            <button className="btn btn-primary form-control" type="submit" value="Submit">
                Edit Password
            </button>
        </div>
    </form>
);

export default PassFormComponent;
