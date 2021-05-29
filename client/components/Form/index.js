import axios from 'axios';
import React, {Component} from 'react';
import {Text, TextInput, Button, ScrollView, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {withRouter} from 'react-router-native';
import {typesOfProperty, typesOfLease} from '../../../utils/constants';
import {BASE_URL} from '../../../utils/constants/axios';

class Form extends Component {
  state = {
    propertyName: '',
    locationName: '',
    pSize: '',
    price: '',
    yearOfConstruction: '',
    numberOfFloors: '',
    description: '',
    numberOfBedrooms: '',
    numberOfBathrooms: '',
    localAmenities: '',
    propertyType: '',
    leaseType: '',
  };

  //Store the text field values in the state

  handleInputChange = (eventValue, input) => {
    this.setState({
      [input]: eventValue,
    });
  };

  //Store the select field values in the state

  handleSelectChange = (eventValue, type) => {
    this.setState({
      [type]: eventValue,
    });
  };

  //Clear the fields by setting the state values to an empty string

  clearFields = () => {
    this.setState({
      propertyName: '',
      locationName: '',
      pSize: '',
      price: '',
      yearOfConstruction: '',
      numberOfFloors: '',
      description: '',
      numberOfBedrooms: '',
      numberOfBathrooms: '',
      localAmenities: '',
      propertyType: '',
      leaseType: '',
    });
  };

  //Call the server post to db request and then clear the fields

  handleDbAdd = async () => {
    const {user} = this.props;
    if (user) {
      const data = this.state;
      await axios.post(`${BASE_URL}/property/add`, {data});
      this.clearFields();
    }
  };

  render() {
    const {
      propertyName,
      locationName,
      pSize,
      price,
      yearOfConstruction,
      numberOfBathrooms,
      numberOfFloors,
      description,
      numberOfBedrooms,
      localAmenities,
      propertyType,
      leaseType,
    } = this.state;
    const {history, user} = this.props;
    return (
      <ScrollView>
        {!user && (
          <Button
            title="Log In / Sign Up"
            onPress={() => history.push('/authentication')}
          />
        )}
        <TextInput
          value={propertyName}
          placeholder="Name and number"
          onChangeText={(event) =>
            this.handleInputChange(event, 'propertyName')
          }
        />
        <TextInput
          value={locationName}
          placeholder="Location"
          onChangeText={(event) =>
            this.handleInputChange(event, 'locationName')
          }
        />
        <TextInput
          value={pSize}
          placeholder="Size"
          onChangeText={(event) => this.handleInputChange(event, 'pSize')}
        />
        <TextInput
          value={price}
          placeholder="Price"
          onChangeText={(event) => this.handleInputChange(event, 'price')}
        />
        <RNPickerSelect
          items={typesOfProperty}
          value={propertyType}
          onValueChange={(event) => {
            this.handleSelectChange(event, 'propertyType');
          }}
          style={pickerSelectStyles}
        />
        <RNPickerSelect
          items={typesOfLease}
          value={leaseType}
          onValueChange={(event) => {
            this.handleSelectChange(event, 'leaseType');
          }}
          style={pickerSelectStyles}
        />
        <TextInput
          value={yearOfConstruction}
          placeholder="Year of construction"
          onChangeText={(event) =>
            this.handleInputChange(event, 'yearOfConstruction')
          }
        />
        <TextInput
          value={numberOfFloors}
          placeholder="Number of floors"
          onChangeText={(event) =>
            this.handleInputChange(event, 'numberOfFloors')
          }
        />
        <TextInput
          value={description}
          placeholder="Description"
          onChangeText={(event) => this.handleInputChange(event, 'description')}
        />
        <TextInput
          value={localAmenities}
          placeholder="Local amenities"
          onChangeText={(event) =>
            this.handleInputChange(event, 'localAmenities')
          }
        />
        <TextInput
          value={numberOfBedrooms}
          placeholder="Numer of Bedrooms"
          onChangeText={(event) =>
            this.handleInputChange(event, 'numberOfBedrooms')
          }
        />
        <TextInput
          value={numberOfBathrooms}
          placeholder="Number of bathrooms"
          onChangeText={(event) =>
            this.handleInputChange(event, 'numberOfBathrooms')
          }
        />
        <Button title="Add property to DB" onPress={this.handleDbAdd} />
        <Button
          title="Go to Properties"
          onPress={() => history.push('/properties')}
        />
        <Button title="Clear fields" onPress={this.clearFields} />
      </ScrollView>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default withRouter(Form);
