import React from 'react';
import {
  Modal,
  SegmentedControlIOS,
  Slider,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import orderBy from 'lodash/orderBy';

import girlsFirstNames from './data/girls-first-names.json';
import girlsMiddleNames from './data/girls-middle-names.json';
import boysFirstNames from './data/boys-first-names.json';
import boysMiddleNames from './data/boys-middle-names.json';

const GENDER_VALUES = ['Both', 'Girls', 'Boys'];
const TYPE_VALUES = ['First', 'Middle'];

const data = {
  Both: {
    First: orderBy(
      boysFirstNames.concat(girlsFirstNames),
      ({ total }) => total,
    ),
    Middle: orderBy(
      boysMiddleNames.concat(girlsMiddleNames),
      ({ total }) => total,
    ),
  },
  Boys: {
    First: boysFirstNames,
    Middle: boysMiddleNames,
  },
  Girls: {
    First: girlsFirstNames,
    Middle: girlsMiddleNames,
  },
};

export default class App extends React.Component {
  state = {
    gender: 'Both',
    type: 'First',
    name: null,
    rank: null,
    showSettings: false,
    minimumRank: 1000,
  };

  handleNext = () => {
    const gender = this.state.gender === 'Both'
      ? Math.random() > 0.5 ? 'Boys' : 'Girls'
      : this.state.gender;
    const names = data[gender][this.state.type];
    const index = Math.floor(
      Math.random() * Math.min(this.state.minimumRank, names.length),
    );
    this.setState({ name: names[index].name, rank: index + 1 });
  };

  handleSettingsToggle = () => {
    this.setState(state => ({ showSettings: !state.showSettings }));
  };

  handleGenderChange = gender => this.setState({ gender });
  handleTypeChange = type => this.setState({ type });
  handleMinimumRankChange = minimumRank => this.setState({ minimumRank });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {this.state.name}
          </Text>
          {this.state.rank && <Text>{this.state.rank} most popular</Text>}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={this.state.name ? 'Next' : 'New Name'}
            onPress={this.handleNext}
          />
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          hitSlop={{ top: 5, left: 10, right: 10, bottom: 5 }}
          onPress={this.handleSettingsToggle}
        >
          <Ionicons name="ios-settings" size={32} color="#777" />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          visible={this.state.showSettings}
          onRequestClose={this.handleSettingsToggle}
        >
          <View style={styles.settings}>
            <View style={styles.settingsHeader}>
              <Button title="Done" onPress={this.handleSettingsToggle} />
            </View>
            <Text style={styles.settingsTitle}>Settings</Text>
            <Text style={styles.settingsLabel}>Gender</Text>
            <SegmentedControlIOS
              values={GENDER_VALUES}
              selectedIndex={GENDER_VALUES.indexOf(this.state.gender)}
              onValueChange={this.handleGenderChange}
            />
            <Text style={styles.settingsLabel}>Type</Text>
            <SegmentedControlIOS
              values={TYPE_VALUES}
              selectedIndex={TYPE_VALUES.indexOf(this.state.type)}
              onValueChange={this.handleTypeChange}
            />
            <Text style={styles.settingsLabel}>
              Minimum rank: #{this.state.minimumRank}
            </Text>
            <Slider
              {...this.props}
              step={10}
              minimumValue={10}
              maximumValue={5000}
              value={this.state.minimumRank}
              onValueChange={this.handleMinimumRankChange}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 45,
    marginBottom: 45,
  },
  buttonContainer: {
    padding: 30,
  },
  settingsButton: {
    position: 'absolute',
    right: 15,
    top: 30,
  },
  settings: {
    flex: 1,
    paddingHorizontal: 15,
  },
  settingsHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 22,
  },
  settingsTitle: {
    fontSize: 30,
  },
  settingsLabel: {
    marginTop: 15,
    marginBottom: 15,
  },
});
