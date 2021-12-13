import React, { useState } from 'react';
import { Text, View } from 'react-native';

import AppleHealthKit, {
    HealthValue,
} from 'react-native-health'
import styles from '../App.style.js';



let restingheartrates: HealthValue[] = []


const RestingHeartRate = (props) => {
    const [latestRestingHeartRate, setLatestRestingHeartRate] = useState(0);
    const permissionGranted = props.permissionGranted
    let options = props.options



    if (permissionGranted == true) {
        AppleHealthKit.getRestingHeartRateSamples(
            options,
            (callbackError: string, results: HealthValue[]) => {
                /* Samples are now collected from HealthKit */
                if (results[0] != null) {
                    restingheartrates = results
                    setLatestRestingHeartRate(restingheartrates[0].value)
                }
                else {
                    setLatestRestingHeartRate(0)
                }
            },
        )

        if (latestRestingHeartRate != 0) {
            return (
                <Text style={styles.heartRateInfoText}>Päivän uusin leposykkeesi on {latestRestingHeartRate}</Text>



            )
        }
        else {
            return (
                <Text> </Text>
            )
        }
    }
    else {
        return (
            <Text> </Text>

        )
    }

}

export default RestingHeartRate