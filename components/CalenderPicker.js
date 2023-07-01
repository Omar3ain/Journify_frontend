import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";
import { selectDate } from "../services/reducers/Flights/availableSlice";

// const theme = {
//   arrowColor: "black",
//   // todayTextColor: 'black',
//   // monthTextColor: 'black',
//   textDayHeaderFontWeight: "bold",
// };

const CalendarPicker = ({ availableDates }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const newMarkedDates = {};
    availableDates.forEach((date) => {
      newMarkedDates[date.split("T")[0]] = { marked: true, selected: false };
    });
    setMarkedDates({ ...newMarkedDates });
  }, [availableDates]);

  useEffect(() => {
    console.log(markedDates);
  }, [markedDates]);

  const showFlights = (day) => {
    setSelectedDate(day.dateString);
    dispatch(selectDate(day.dateString));
  };

  return (
    <View>
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => showFlights(day)}
        markedDatesStyle={{ backgroundColor: "blue" }}
        markingType="simple"
        current={selectedDate || availableDates[0]}
        minDate={availableDates[0]}
        maxDate={availableDates[availableDates.length - 1]}
        // theme={theme}
      />
    </View>
  );
};

export default CalendarPicker;
