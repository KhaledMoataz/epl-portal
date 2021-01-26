import React from 'react';
import Item from './Item';

/*  The Form Component consists of 9 Items and 1 Button
    The 9 Items are:
        first_name, last_name, birthdate, gender
        city, address, email, role, password
    each item has its own properties:
        1- name:            unique name for this item
        2- onChange:        function to control the item when its value changes
        3- item:            icon th preappend it in the item
        4- type:            the input type for this item e.g. text, password, date ... etc
        5- placeholder:     message to be shown inside the input if empty
        6- invalid_message  the message to be shown below the item if typed invalid input
        7- validation       when 'is-invalid' it shows error message below this item
*/

const DataFormComponent = (props) => (
    <form className="form-data" onSubmit={props.submitHandler}>
        <Item
            name="username"
            onChange={props.changeHandler}
            item="fa fa-user-o fa-fw"
            type="username"
            placeholder="username"
        />

        <Item
            name="first_name"
            onChange={props.changeHandler}
            item="fa fa-user fa-fw"
            type="text"
            placeholder="First Name"
        />

        <Item
            name="last_name"
            onChange={props.changeHandler}
            item="fa fa-user fa-fw"
            type="text"
            placeholder="Last Name"
        />

        <Item
            name="birthdate"
            onChange={props.changeHandler}
            item="fa fa-birthday-cake fa-fw"
            type="date"
            placeholder="Date"
        />

        <Item
            name="gender"
            onChange={props.changeHandler}
            item="fa fa-chevron-circle-down fa-fw"
            type="gender"
            placeholder="Gender"
        />

        <Item
            name="city"
            onChange={props.changeHandler}
            item="fa fa-location-arrow fa-fw"
            type="city"
            placeholder="City"
        />

        <Item
            name="address"
            onChange={props.changeHandler}
            item="fa fa-map-marker fa-fw"
            type="address"
            placeholder="Address"
        />

        <Item
            name="email"
            onChange={props.changeHandler}
            item="fa fa-envelope fa-fw"
            type="email"
            placeholder="email"
        />

        <Item
            name="role"
            onChange={props.changeHandler}
            item="fa fa-chevron-circle-down fa-fw"
            type="role"
            placeholder="role"
            invalid_message={props.role_message}
            validation={props.role_message ? 'is-invalid' : ''}
        />

        <Item
            name="password"
            onChange={props.changeHandler}
            item="fa fa-lock fa-fw"
            type="password"
            placeholder="Password"
            invalid_message={props.pass_message}
            validation={props.pass_message ? 'is-invalid' : ''}
        />

        <div className="form-group input-group text-center">
            <button className="btn btn-primary form-control" type="submit" value="Submit">
                Edit Profile
            </button>
        </div>
    </form>
);

export default DataFormComponent;
