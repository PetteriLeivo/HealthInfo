import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'

export default (props) => {
  console.log("Päivämäärä vaihtui", props.date)
  return <DatePicker date={props.date} onDateChange={props.setDate} mode="date" locale="fi" />
}