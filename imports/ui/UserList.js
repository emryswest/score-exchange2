import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { setSelectedUser, getSelectedUser } from '../ui/selecteduser';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.clickUser = this.clickUser.bind(this);
  }

  clickUser(aUser) {
    let intermediate = aUser._id;
    if (intermediate == getSelectedUser()) {
        setSelectedUser(undefined);
    } else {
        setSelectedUser(intermediate);
    }
    this.setState({currentSelection: getSelectedUser()}); // force a re-render
  }



  render() {
    let users = Meteor.users.find({});
    let isScorePresent = this.props.isScorePresent;
    let display = users.map((aUser, key) => {
      // display all other users (not current user) and select the user when clicked on
  if (aUser._id !== Meteor.userId()) {
      return <div className={aUser._id == getSelectedUser() ? 'highlighted-user' : 'individual-user'} onClick={this.clickUser.bind(this, aUser)} key={key}>
      <li>{aUser.username}</li>
      </div>
    }
    })
    // display list of users - if there is a score in the way, condense the list
    return (
      <div className={isScorePresent.length > 0 ? "players-container-condensed" : "players-container"}>
        {display}
      </div>
    );
  }
}

export default UserList;

/*
Citations

Dimitru, Dr. (2018) “Meteor Files: React Example.” Veliov Group.
https://github.com/VeliovGroup/Meteor-Files/wiki/React-Example (accessed fall 2018)

*/
