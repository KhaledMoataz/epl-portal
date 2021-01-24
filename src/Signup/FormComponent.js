import React from 'react';
import Item from './Item';

const FormComponent = (props) => (
    <form className="form-data" onSubmit={props.submitHandler}>
        <Item
            name="username"
            onChange={props.changeHandler}
            item="fa fa-user-o fa-fw"
            type="text"
            placeholder="Username"
            invalid_message={props.user_message}
            validation={props.user_message == null ? '' : 'is-invalid'}
        />
        <Item
            name="password"
            onChange={props.changeHandler}
            item="fa fa-lock fa-fw"
            type="password"
            placeholder="Password"
            invalid_message={props.pass_message}
            validation={props.pass_message == null ? '' : 'is-invalid'}
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
            invalid_message={props.email_message}
            validation={props.email_message == null ? '' : 'is-invalid'}
        />

        <Item
            name="role"
            onChange={props.changeHandler}
            item="fa fa-chevron-circle-down fa-fw"
            type="role"
            placeholder="role"
        />

        <div className="form-group input-group text-center">
            <button className="btn btn-primary form-control" type="submit" value="Submit">
                Register
            </button>
        </div>
    </form>
);

export default FormComponent;
