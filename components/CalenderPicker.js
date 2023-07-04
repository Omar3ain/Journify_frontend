import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";
import { selectDate } from "../services/reducers/Flights/availableSlice";

const theme = {
  backgroundColor: "#ffffff",
  calendarBackground: "#ffffff",
  textSectionTitleColor: "#b6c1cd",
  selectedDayBackgroundColor: "#00adf5",
  selectedDayTextColor: "#ffffff",
  todayTextColor: "#00adf5",
  dayTextColor: "#2d4150",
  textDisabledColor: "gray",
  arrowColor: "#2cb8e5",
};

const CalendarPicker = ({ availableDates }) => {
  const initialDate = availableDates.length ? availableDates[availableDates.length - 1] : null;
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [markedDates, setMarkedDates] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const newMarkedDates = {};
    availableDates.forEach((date, i) => {
      if (i === availableDates.length - 1) {
      // if (date == selectedDate) {
        console.log(date);
        console.log(selectedDate);
        newMarkedDates[date.split("T")[0]] = {
          marked: true,
          selected: true,
          selectedColor: "#2cb8e5",
        };
      } else
        newMarkedDates[date.split("T")[0]] = { marked: true, selected: false };
    });
    setMarkedDates({ ...newMarkedDates });
  }, [availableDates]);

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
        current={selectedDate || availableDates[availableDates.length - 1]}
        // disableAllTouchEventsForDisabledDays={true}
        theme={theme}
        // minDate={availableDates[0]}
        // maxDate={availableDates[availableDates.length - 1]}
      />
    </View>
  );
};

export default CalendarPicker;
