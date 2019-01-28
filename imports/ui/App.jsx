import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
// import { Scores } from '../api/scores.js';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Task from './Task.js';
// import Score from './Score.js';
import IndividualFile from './FileIndividualFile.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import FileUpload from './FileUpload.js';
import UserList from './UserList.js';
import { getSelectedUser } from './selecteduser.js';

  // App component - represents the whole app
  class App extends Component {

    handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text, getSelectedUser());

    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }


    renderScores() {
      let myScores = this.props.scores;
      let recentScores;
    //  let index1;

      // show those for US or for anyone!
      myScores = myScores.filter(score =>
        score.targetuser == Meteor.userId()
      );
      if (myScores.length > 1) {
        Meteor.call('tasks.remove', myScores[0]._id);
      }

  //    myTasks = myTasks.reverse();

      myScores = myScores.length > 1 ? [ myScores[myScores.length - 1] ] : myScores;

  //    index1 = myTasks.find[1];

  //    console.log(index1);


      return myScores.map((task) => {
          return (
            <Task
              key={task._id}
              task={task}
            />
          );
      });
    }

    prepareMyScores() {
      let activeScores = this.props.scores;
      let myScores = activeScores.filter(task =>
      task.targetuser == Meteor.userId()
      );
      return (
        myScores
      )
    }

    passAllScores() {
      let passAllScores = this.props.scores.username;
      return (
        passAllScores
      )
    }

  render() {
let passMyScores = this.prepareMyScores();
let passAllScores = this.passAllScores();

    return (
      <div>
        <div className="app-container">
        <header>
        <AccountsUIWrapper />
          <h1>Players</h1>

        </header>
          <UserList myScores={passMyScores} passAllScores={passAllScores}/>
          <div className="material">
            <ul>
              {this.renderScores()}
            </ul>
          </ div>

          <FileUpload />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {


  return {
    scores: Tasks.find({}, { sort: { createdAt: 1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);


{/*
Citations

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Adding user accounts.” meteor.com.
https://www.meteor.com/tutorials/react/adding-user-accounts (accessed fall 2018)

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Collections.” meteor.com.
https://www.meteor.com/tutorials/react/collections (accessed fall 2018)

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Components.” meteor.com.
https://www.meteor.com/tutorials/react/components (accessed fall 2018)

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Forms and Events.” meteor.com.
https://www.meteor.com/tutorials/react/forms-and-events (accessed fall 2018)

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Publish and subscribe.” meteor.com.
https://www.meteor.com/tutorials/react/publish-and-subscribe (accessed fall 2018)

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Security with methods.” meteor.com.
https://www.meteor.com/tutorials/react/security-with-methods (accessed fall 2018)

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Temporary UI state.” meteor.com.
https://www.meteor.com/tutorials/react/temporary-ui-state (accessed fall 2018)

*/}
