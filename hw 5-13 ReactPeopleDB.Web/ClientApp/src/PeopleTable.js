import React from 'react';
import DisplayPersonRow from './DisplayPersonRow';
import PersonAddChange from './PersonAddChange';
import axios from 'axios';
import { produce } from 'immer';

class PeopleTable extends React.Component {

    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        addButton: true
    }

    componentDidMount = () => {
        this.fillTable();
    }

    fillTable = () => {
        axios.get('/api/people/getPeople').then(response => {
            const people = response.data;
            this.setState({ people });
        });
    }

    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft.person[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onAgeChange = e => {
        var ageInt = parseInt(e.target.value);
        const nextState = produce(this.state, draft => {
            draft.person.age = ageInt;
        });
        this.setState(nextState);
    }

    clearTextboxes = () => {
        const nextState = produce(this.state, draft => {
            draft.person = {
                firstName: '',
                lastName: '',
                age: ''
            }
        });
        this.setState(nextState);
    }

    onAddClick = () => {
        axios.post('/api/people/addPerson', this.state.person).then(() => {
            this.clearTextboxes();
            this.fillTable();
        });
    }

    onUpdateClick = () => {
        axios.post('/api/people/updatePerson', this.state.person).then(() => {
            this.clearTextboxes();
            this.fillTable();
            this.changeAddUpdate();
        });
    }
    //here need to pass over the current state.person which has the id from the edit button, to the controller
    //and reset the Update button to be add

    onDeleteClick = p => {
        axios.post('/api/people/delete', p).then(() => {
            this.fillTable();
        });
    }

    changeAddUpdate = () => {
        const nextState = produce(this.state, draft => {
            draft.addButton = !draft.addButton
        });
        this.setState(nextState);
    }



    onEditClick = p => {
        const nextState = produce(this.state, draft => {
            draft.person = p; draft.addButton = !draft.addButton;
            console.log(this.state.addButton)
        });
        this.setState(nextState);
    }
    //now the state.person is equal to this same person and has the Id.
    //need the Add Person to switch to Update


    render() {
        const { person, people, addButton } = this.state;
        return (
            <div className="container">

                <PersonAddChange
                    person={person}
                    onTextChange={this.onTextChange}
                    onAgeChange={this.onAgeChange}
                    onAddClick={this.onAddClick}
                    onUpdateClick={this.onUpdateClick}
                    isAddButton={addButton} />

                <table className="table table-striped table-bordered" style={{ marginTop: 60 }}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map(p => <DisplayPersonRow key={p.id} person={p}
                            onEditClick={() => this.onEditClick(p)}
                            onDeleteClick={() => this.onDeleteClick(p)} />)}
                    </tbody>
                </table>

            </div>
        )
    }

}

export default PeopleTable;