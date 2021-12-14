import React, { useState } from 'react';
import { Text, View } from 'react-native';

import AppleHealthKit, {
  HealthValue,
} from 'react-native-health'
import styles from '../App.style.js';


let heartrates: HealthValue[] = []
let pulses: number[]

const HeartRateInfo = (props) => {
  const [latestHeartRate, setLatestHeartRate] = useState(0);
  const permissionGranted = props.permissionGranted
  let options = props.options
  let date = props.date  
  if (permissionGranted == true) {
    AppleHealthKit.getHeartRateSamples(
      options,
      (callbackError: string, results: HealthValue[]) => {
        /* Samples are now collected from HealthKit */
        if (results[0] != null) {
          pulses = results.map(heartrate => heartrate.value)
          console.log("Pulssit", pulses)
          setLatestHeartRate(pulses[0])
        }
        else {
          pulses = []
          setLatestHeartRate(0)
          console.log("Ei syketietoja tai et antanut lupaa syketietojen käyttämiseen")
        }
      },
    )

    if (latestHeartRate != 0) {
     
      return (
        <React.Fragment>
          <Text style={styles.dateTitle}>Päivämäärä {date.toLocaleDateString('fi')}</Text>
          <View style={styles.separator}></View>
          <Text style={styles.heartRateInfoText}>Päivän uusin syke {Math.round(latestHeartRate)}</Text>
          <View style={styles.separator}></View>
          <AverageHeartRate pulses={pulses} />
          <View style={styles.separator}></View>
        </React.Fragment>
      );
    }
    else {
      return (
        <React.Fragment>
          <Text style={styles.baseText}>Päivämäärä {date.toLocaleDateString('fi')}</Text>
          <View style={styles.separator}></View>
          <Text style={styles.heartRateInfoText}>Ei syketietoja</Text>
        </React.Fragment>

      );
    }

  }
  else {
    return (
      <Text>Et antanut lupaa syketietojen käyttämiselle</Text>
    )
  }
}

const AverageHeartRate = (props) => {
  let sumOfPulseValues = 0
  let pulses = props.pulses
  
  if (pulses.length > 1) {
    sumOfPulseValues = pulses.reduce((x, y) => x + y)

    return (
      <React.Fragment>
        <Text style={styles.heartRateInfoText}>Päivän sykekeskiarvo {(Math.round(sumOfPulseValues / pulses.length))}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.heartRateInfoText}>Päivän sykervoja yhteensä {pulses.length} kappaletta </Text>
      </React.Fragment>
    )

  }
  return (
    <Text style={styles.heartRateInfoText}>Päivän sykekeskiarvo {Math.round(pulses[0])}</Text>
  )

}




export default HeartRateInfo;