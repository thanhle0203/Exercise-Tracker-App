
import React, { Component } from 'react';
import axios from 'axios';

export default class ExercisesList extends Component {
  constructor(props) {
      super(props);

      this.deleteExercise = this.deleteExercise.bind(this);

      this.state = {exercises: []};
  }

  componentDidMount() {
      axios.get('http://localhost:8000/exercises/')
        .then(response => {
            this.setState({ exercises: response.data });
        })
        .catch((error) => {
            console.log(error);
        })
  }

  deleteExercise(id) {
      axios.delete('http://localhose:8000/exercises'+id)
        .then(res => console.log(res.data));

    this.setState({
        exercises: this.state.exercises.filter(el => el._id != id)
    })
  }

  ExercisesList() {
      return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise = 
          {this.deleteExercise} key={currentexercise._id}/>
      })
  }
  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>>
        <table className='table'>
            <thead className='thead-ligh'>
                <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>

            </thead>
            <tbody>
                { this.ExercisesList()}
            </tbody>
        </table>
      </div>
    )
  }
}