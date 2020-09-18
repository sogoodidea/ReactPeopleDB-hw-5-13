import React from 'react';

class DisplayPersonRow extends React.Component {
    render() {
        const { onEditClick, onDeleteClick } = this.props;
        const { id, firstName, lastName, age } = this.props.person;

        return (
            <tr>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{age}</td>
                <td><button className="btn btn-info" onClick={onEditClick}>Edit</button>  
                    <button className="btn btn-danger" onClick={onDeleteClick}>Delete</button></td>
            </tr>
        );
    }
}

export default DisplayPersonRow;