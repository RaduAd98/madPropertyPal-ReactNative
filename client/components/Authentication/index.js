import React, {Component} from 'react';
import {TextInput, View, Text, Button} from 'react-native';
import {withRouter} from 'react-router-native';
import {auth} from '../../../firebase';

class Authentication extends Component {

  //This is the state that stores the current email and password typed by the user in the textboxes

  state = {
    email: '',
    password: '',
  };

  //Change the email/password state with the value provided

  handleInput = (eventValue, inputType) => {
    this.setState({
      [inputType]: eventValue,
    });
  };

  //Login using the firebase function and then redirect the user to "/" -> Form page

  handleLogIn = () => {
    const {history} = this.props;
    const {email, password} = this.state;
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push('/'));
  };

  //Sign up using the firebase function and then redirect the user to "/" -> Form page

  handleSignUp = () => {
    const {email, password} = this.state;
    const {history} = this.props;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => history.push('/'));
  };

  render() {
    const {email, password} = this.state;
    const {history} = this.props;
    return (
      <View>
        <Button title="Go Back to form" onPress={() => history.goBack()} />
        <TextInput
          onChangeText={(eventValue) => this.handleInput(eventValue, 'email')}
          placeholder="Your Email">
          {email}
        </TextInput>
        <TextInput
          onChangeText={(eventValue) =>
            this.handleInput(eventValue, 'password')
          }
          secureTextEntry={true}
          placeholder="Your Password">
          {password}
        </TextInput>
        <Button title="Log In" onPress={this.handleLogIn} />
        <Button title="Sign Up" onPress={this.handleSignUp} />
      </View>
    );
  }
}

export default withRouter(Authentication);
