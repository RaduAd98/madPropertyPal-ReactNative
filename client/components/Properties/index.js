import axios from 'axios';
import React, {Component} from 'react';
import {Button, ScrollView, TextInput, View, Text} from 'react-native';
import {withRouter} from 'react-router-native';
import {BASE_URL} from '../../../utils/constants/axios';

class Properties extends Component {
  state = {
    properties: [],
  };

  //Fetch the properties from the server

  handlePropertyGet = async () => {
    const {data: properties} = await axios.get(`${BASE_URL}/properties`);
    this.setState({
      properties,
    });
  };

  async componentDidMount() {
    await this.handlePropertyGet();
  }

  //Edit a property at a certain index in the property list

  handlePropertyEdit = async (index) => {
    const {user} = this.props;
    if (user) {
      const data = {...this.state.properties}[index];
      try {
        await axios.post(`${BASE_URL}/property/edit`, {data});
        this.handlePropertyGet();
      } catch (err) {
        console.log(err);
      }
    }
  };

  //Delete a property by the property id from the database -> see SQL command from deleteFromDb.js

  handlePropertyDelete = async (id) => {
    const {user} = this.props;
    if (user) {
      try {
        await axios.post(`${BASE_URL}/property/delete`, {id});
        this.handlePropertyGet();
      } catch (err) {
        console.log(err);
      }
    }
  };

  //Change the input text box from a certain property from the list using the index

  handleInputChange = (eventValue, input, index) => {
    const properties = [...this.state.properties];
    properties[index][input] = eventValue;
    this.setState({
      properties,
    });
  };

  render() {
    const {properties} = this.state;
    const {history, user} = this.props;
    return (
      <ScrollView>
        {!user && (
          <Button
            title="Log In / Sign Up"
            onPress={() => history.push('/authentication')}
          />
        )}
        <Button title="Go back to form" onPress={() => history.push('/')} />
        {properties.length ? (
          properties.map((property, idx) => {
            //Create an array of objects that will be used for rendering the properties
            const propertyCollection = [];
            for (let key in property) {
              propertyCollection.push({
                [key]: property[key],
              });
            }

            //For a property, render its text inputs
            return (
              <View key={`p-${idx}`}>
                {propertyCollection.map((details, index) => {
                  const collectionKey = Object.keys(details)[0];
                  const collectionValue = Object.values(details)[0];
                  return (
                    <TextInput
                      editable={collectionKey === 'id' ? false : true}
                      placeholder={collectionKey}
                      onChangeText={(event) => {
                        this.handleInputChange(event, collectionKey, idx);
                      }}
                      key={`d-${index}`}>
                      {collectionValue}
                    </TextInput>
                  );
                })}
                <Button
                  title="Edit"
                  onPress={() => {
                    this.handlePropertyEdit(idx);
                  }}
                />
                <Button
                  title="Delete"
                  onPress={() => this.handlePropertyDelete(properties[idx]?.id)}
                />
              </View>
            );
          })
        ) : (
          <Text>No properties added.</Text>
        )}
      </ScrollView>
    );
  }
}

export default withRouter(Properties);

//Enhance the component that makes it able to use history
