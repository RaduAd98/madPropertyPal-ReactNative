import React, {Component} from 'react';
import Form from './client/components/Form';
import Properties from './client/components/Properties';
import {NativeRouter, Route, Switch, withRouter} from 'react-router-native';
import Authentication from './client/components/Authentication';
import {auth} from './firebase';
import {Button} from 'react-native';

class App extends Component {

  //The state of our App component => is user authenticated or not
  //It is initially set as null => user is not authenticated

  state = {
    user: null,
  };

  //When the main App component mounts, look for any authentication changes, like if the user logged in or out
  //Set this in the state of the App component

  componentDidMount() {
    auth.onAuthStateChanged((userAuth) => {
      this.setState({
        user: userAuth,
      });
    });
  }

  //Function that signs the user out using the auth object imported from firebase package

  signOut = async () => {
    const {user} = this.state;
    try {
      await auth.signOut();
    } catch (err) {
      console.log('err here', err);
    }
  };

  render() {
    const {user} = this.state;
    return (
      <NativeRouter>
        {/* Render the log out button if the user is logged in */}
        {user ? (
          <Button title="Log Out" onPress={this.signOut} />
        ) : null}

        <Switch>
          {/* Change the rendered component depending on the current path: "/", "/properties", etc. */}
          {/* Pass the data about user being logged in or not in these 3 components */}
          <Route exact path="/" component={() => <Form user={user} />} />
          <Route
            exact
            path="/properties"
            component={() => <Properties user={user} />}
          />
          <Route
            exact
            path="/authentication"
            component={() => <Authentication user={user} />}
          />
        </Switch>
      </NativeRouter>
    );
  }
}

export default App;
