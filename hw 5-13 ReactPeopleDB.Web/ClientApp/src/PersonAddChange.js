import React from 'react';

class PersonAddChange extends React.Component {
    render() {
        const { onTextChange, onAddClick, onUpdateClick, onAgeChange, isAddButton } = this.props;
        const { firstName, lastName, age } = this.props.person;

        return (
            <div className="row" style={{ marginTop: 60 }}>
                <div className="col-md-3">
                    <input type="text" className="form-control"
                        name="firstName" value={firstName}
                        placeholder="First Name"
                        onChange={onTextChange} />
                </div>

                <div className="col-md-3">
                    <input type="text" className="form-control"
                        name="lastName" value={lastName}
                        placeholder="Last Name"
                        onChange={onTextChange} />
                </div>

                <div className="col-md-3">
                    <input type="text" className="form-control"
                        name="age" value={age}
                        placeholder="Age"
                        onChange={onAgeChange} />
                </div>

                <div className="col-md-3">
                    {isAddButton && <button className="btn btn-primary btn-block" onClick={onAddClick}>Add Person</button>}
                    {!isAddButton && <button className="btn btn-success btn-block" onClick={onUpdateClick}>Update</button>}
                   
                </div>

            </div>
        )
    }
}

export default PersonAddChange;