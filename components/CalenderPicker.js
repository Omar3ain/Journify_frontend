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
  const initialDate = useSelector(state => state.flights.selectedDate.length ? state.flights.selectedDate.length : null)
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [markedDates, setMarkedDates] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const newMarkedDates = {};
    availableDates.forEach((date) => {
      newMarkedDates[date.split("T")[0]] = { marked: true, selected: false };
    });
    setMarkedDates({ ...newMarkedDates });
  }, [availableDates]);


  // const showFlights = (day) => {
  //   setSelectedDate(day.dateString);
  //   dispatch(selectDate(day.dateString));
  //   setMarkedDates({
  //     ...markedDates,
  //     [day.dateString]: {
  //       ...markedDates[day.dateString],
  //       selected: true,
  //       selectedColor: "#2cb8e5",
  //     },
  //   });
  // };


  const showFlights = (day) => {
    if (selectedDate) {
      setMarkedDates({
        ...markedDates,
        [selectedDate]: {
          ...markedDates[selectedDate],
          selected: false,
          selectedColor: undefined,
        },
        [day.dateString]: {
          ...markedDates[day.dateString],
          selected: true,
          selectedColor: "#2cb8e5",
        },
      });
    } else {
      setMarkedDates({
        ...markedDates,
        [day.dateString]: {
          ...markedDates[day.dateString],
          selected: true,
          selectedColor: "#2cb8e5",
        },
      });
    }
    setSelectedDate(day.dateString);
    dispatch(selectDate(day.dateString));
  };

  return (
    <View>
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => showFlights(day)}
        markedDatesStyle={{ backgroundColor: "#2cb8e5" }}
        markingType="simple"
        current={selectedDate || availableDates[0]}
        // minDate={availableDates[0]}
        // maxDate={availableDates[availableDates.length - 1]}
        // theme={theme}
      />
    </View>
  );
};

export default CalendarPicker;
