import React from "react";
import { Text } from "react-native";


import AppleHealthKit, {
    HealthValue
  } from 'react-native-health'
import styles from '../App.style.js';


import {useState} from 'react';


const StepsForTheday = (props) => 
{
    const permissionGranted = props.permissionGranted
    const [thisDayStepCount, setThisDayStepCount] = useState(0);
    let aloitusPVM = props.date
    aloitusPVM.setHours(0,0,0,0)
    
    let StepsOptions = {
        date: aloitusPVM.toISOString()
        
      }

      if (permissionGranted == true) {
        AppleHealthKit.getStepCount(
          StepsOptions,
          (err: Object, results: HealthValue) => {
            if (err) {
              return
            }
            setThisDayStepCount(results.value)
            console.log(results)
          },
        )

  if (thisDayStepCount != 0) {
  return (
    
    <Text style={styles.heartRateInfoText}>Tämän päivän askeleet {Math.round(thisDayStepCount)}</Text>
    
    );
  }
  else {
    return (
      <Text style={styles.heartRateInfoText}>Tänään ei ole tullut askelia</Text>
    )
  }
}
else {
  return (
    <Text style={styles.heartRateInfoText}>Et antanut lupaa askeltietojen käyttämiselle</Text>
  )
}

}

export default StepsForTheday