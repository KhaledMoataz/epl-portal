import React from 'react';

/*  The Form Component consists of 2 Items and 1 Button
    The 2 Items are username and password
    each Item has its own properties:
        1- name:            unique name for this Item
        2- onChange:        function to control the Item when its value changes
        3- type:            the input type for this Item text or password
        4- placeholder:     message to be shown inside the input if empty
        5- validation       when 'is-invalid' it shows error message below this Item
*/

const FormComponent = (props) => (
    <form className="form-data" onSubmit={props.submitHandler}>
        <div className="text-uppercase font-weight-bold ">
            Username
            <div className="form-group input-group required ">
                <input
                    name="username"
                    onChange={props.changeHandler}
                    type="text"
                    placeholder="Enter username"
                    required
                    className={`form-control mt-1 ${props.user_message ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{props.user_message}</div>
            </div>
        </div>

        <div className="text-uppercase font-weight-bold ">
            Password
            <div className="form-group input-group required ">
                <input
                    name="password"
                    onChange={props.changeHandler}
                    type="password"
                    placeholder="Enter password"
                    required
                    className={`form-control mt-1 ${props.pass_message ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{props.pass_message}</div>
            </div>
        </div>

        <div className="form-group input-group text-center">
            <button className="btn btn-primary form-control" type="submit" value="Submit">
                Login
            </button>
        </div>
    </form>
);

export default FormComponent;
