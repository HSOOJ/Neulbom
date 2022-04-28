import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

// 사용 예시 screen/calendar/calendarTab/CalendarTab
const ButtonCompo = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#09BC8A",
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 25,
        alignItems: "center",
        borderRadius: 10,
      }}
      onPress={props.onPressButton}
    >
      <Text style={{ color: "white", fontSize: 20 }}>{props.buttonName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ButtonCompo;
