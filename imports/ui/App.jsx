import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Scores } from '../api/scores.js';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Score from './Score.js';
import IndividualFile from './FileIndividualFile.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import FileUpload from './FileUpload.js';
import UserList from './UserList.js';
import { getSelectedUser } from './selecteduser.js';

  // App component - represents the whole app
  class App extends Component {

    // display the score sent to the current user
    renderScore() {
      // retrieves a list of active scores from the Scores database
      let myScores = this.props.scores;

      // Filter out scores which are sent to the current user
      myScores = myScores.filter(score => score.targetuser == Meteor.userId());
      if (myScores.length > 1) {
        Meteor.call('scores.remove', myScores[0]._id);
      }

      // Delete older scores, only showing the most recent one received
      myScores = myScores.length > 1 ? [ myScores[myScores.length - 1] ] : myScores;

      // Return a Score component for the targetted score
      return myScores.map((score) => {
          return (
            <Score
              key={score._id}
              score={score}
            />
          );
      });
    }
    // does the current user have a score in front of them? UserList needs this answer.
    isScorePresent() {
      let activeScores = this.props.scores;
      let myScores = activeScores.filter(score =>
      score.targetuser == Meteor.userId()
      );
      return (
        myScores
      )
    }

  render() {
let isScorePresent = this.isScorePresent();

    return (
      <div>
        <div className="app-container">
          <header>
            <AccountsUIWrapper />
              <h1>Players</h1>
          </header>

            <UserList isScorePresent={isScorePresent} />

            <div className="material">
              <ul>
                {this.renderScore()}
              </ul>
            </ div>

            <FileUpload />

          </ div>
      </ div>
    );
  }
}

export default withTracker(() => {

  return {
    scores: Scores.find({}, { sort: { createdAt: 1 } }).fetch(),
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
