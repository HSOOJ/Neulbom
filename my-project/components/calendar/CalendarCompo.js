import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import { Text, View, StyleSheet } from "react-native";
import { format } from "date-fns";
import { getCalendarList } from "../../api/reports";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import calendarSlice from "../../slices/calendar";

const screenSize = Dimensions.get("screen");

const CalendarCompo = () => {
  const dispatch = useDispatch();
  const calendarList = useSelector((state) => state.calendar.calendarList);
  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaNow = new Date(utcNow + koreaTimeDiff);
  const userSeq = useSelector((state) => state.user.userSeq);
  const bloodPressure = { key: "bloodPressure", color: "#558BCF" };
  const alcohol = { key: "alcohol", color: "#0E0F37" };
  const bloodSugar = { key: "bloodSugar", color: "#F4525F" };
  const coffee = { key: "coffee", color: "#FF7F00" };
  const exercise = { key: "exercise", color: "#09BC8A" };
  const [loading, isLoading] = useState(true);
  const [bloodPressureList, setBloodPressureList] = useState([]);
  const [bloodSugarList, setBloodSugarList] = useState([]);
  const [alcoholList, setAlcoholList] = useState([]);
  const [coffeeList, setCoffeeList] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  const [click, isClick] = useState(false);
  const [bloodPressureClick, setBloodPressureClick] = useState(false);
  const [bloodSugarClick, setBloodSugarClick] = useState(false);
  const [alcoholClick, setAlcoholClick] = useState(false);
  const [coffeeClick, setCoffeeClick] = useState(false);
  const [exerciseClick, setExerciseClick] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    format(koreaNow, "yyyy-MM-dd")
  );

  const getCalendarListFunction = async (month) => {
    try {
      const response = await getCalendarList(month, userSeq);
      dispatch(calendarSlice.actions.setCalendar(response));
      // setCalendarList(response);
      isLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCalendarListFunction(selectedDate.slice(0, 7), userSeq);
    picker(selectedDate);
    setSelectedDate(format(koreaNow, "yyyy-MM-dd"));
  }, []);

  useEffect(() => {
    picker(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    getCalendarListFunction(selectedDate.slice(0, 7), userSeq);
    picker(selectedDate);
  }, [calendarList]);

  let markedDates = {};
  for (const date in calendarList) {
    const dot = [];
    for (let i in calendarList[date]["dots"]) {
      if (calendarList[date]["dots"][i] === "alcohol") {
        dot.push(alcohol);
      } else if (calendarList[date]["dots"][i] === "bloodPressure") {
        dot.push(bloodPressure);
      } else if (calendarList[date]["dots"][i] === "bloodSugar") {
        dot.push(bloodSugar);
      } else if (calendarList[date]["dots"][i] === "coffee") {
        dot.push(coffee);
      } else if (calendarList[date]["dots"][i] === "exercise") {
        dot.push(exercise);
      }
    }
    markedDates[date] = { dots: dot };
  }

  const picker = (date) => {
    setBloodPressureList([]);
    setBloodSugarList([]);
    setAlcoholList([]);
    setCoffeeList([]);
    setExerciseList([]);
    setBloodPressureClick(false);
    setBloodSugarClick(false);
    setAlcoholClick(false);
    setCoffeeClick(false);
    setExerciseClick(false);
    isClick(false);
    if (calendarList[date]) {
      const keys = Object.keys(calendarList[date]);
      isClick(true);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] != "dots") {
          if (keys[i] === "bloodPressure") {
            setBloodPressureList((oldArray) => [
              ...oldArray,
              calendarList[date]["bloodPressure"],
            ]);
            setBloodPressureClick(true);
          } else if (keys[i] === "bloodSugar") {
            setBloodSugarList((oldArray) => [
              ...oldArray,
              calendarList[date]["bloodSugar"],
            ]);
            setBloodSugarClick(true);
          } else if (keys[i] === "alcohol") {
            setAlcoholList((oldArray) => [
              ...oldArray,
              calendarList[date]["alcohol"],
            ]);
            setAlcoholClick(true);
          } else if (keys[i] === "coffee") {
            setCoffeeList((oldArray) => [
              ...oldArray,
              calendarList[date]["coffee"],
            ]);
            setCoffeeClick(true);
          } else if (keys[i] === "exercise") {
            setExerciseList((oldArray) => [
              ...oldArray,
              calendarList[date]["exercise"],
            ]);
            setExerciseClick(true);
          }
        }
      }
    }
  };

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Calendar
            markingType={"multi-dot"}
            markedDates={markedDates}
            selectedDate={selectedDate}
            onDayPress={(a) => {
              setSelectedDate(a.dateString);
            }}
            theme={{
              selectedDayBackgroundColor: "#009688",
              todayTextColor: "#009688",
            }}
            onMonthChange={(month) => {
              getCalendarListFunction(month.dateString.slice(0, 7));
            }}
          />
          <View
            style={[
              styles.row,
              {
                marginHorizontal: screenSize.width * 0.07,
                justifyContent: "space-between",
              },
            ]}
          >
            <View style={styles.row}>
              <Text
                style={[styles.circle, { backgroundColor: "#F4525F" }]}
              ></Text>
              <Text>??????</Text>
            </View>
            <View style={styles.row}>
              <Text
                style={[styles.circle, { backgroundColor: "#558BCF" }]}
              ></Text>
              <Text>??????</Text>
            </View>
            <View style={styles.row}>
              <Text
                style={[styles.circle, { backgroundColor: "#0E0F37" }]}
              ></Text>
              <Text>??????</Text>
            </View>
            <View style={styles.row}>
              <Text
                style={[styles.circle, { backgroundColor: "#FF7F00" }]}
              ></Text>
              <Text>??????</Text>
            </View>
            <View style={styles.row}>
              <Text
                style={[styles.circle, { backgroundColor: "#09BC8A" }]}
              ></Text>
              <Text>??????</Text>
            </View>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {click ? (
              <View style={styles.box}>
                <Text style={styles.date}>
                  {selectedDate.slice(0, 4)}??? {selectedDate.slice(5, 7)}???{" "}
                  {selectedDate.slice(8, 10)}???
                </Text>
                {bloodSugarClick ? (
                  <View style={styles.row}>
                    <Text style={styles.title}>??????</Text>
                    {bloodSugarList[0].map((data) => (
                      <View style={styles.boxSec}>
                        <View>
                          <Text key={data.bsSeq}>{data.bsCode}</Text>
                        </View>
                        <View>
                          <Text key={data.bsSeq}>{data.bsTime}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.numberText}>?????? ?????? </Text>
                          <Text style={styles.numberText} key={data.bsSeq}>
                            {data.bsLevel}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null}
                {bloodPressureClick ? (
                  <View style={styles.row}>
                    <Text style={styles.title}>??????</Text>
                    {bloodPressureList[0].map((data) => (
                      <View style={styles.boxSec}>
                        <View>
                          <Text key={data.bpSeq}>{data.bpCode}</Text>
                        </View>
                        <View>
                          <Text key={data.bpSeq}>{data.bpTime}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.numberText}>?????? ?????? </Text>
                          <Text style={styles.numberText} key={data.bpSeq}>
                            {data.bpHigh}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.numberText}>?????? ?????? </Text>
                          <Text style={styles.numberText} key={data.bpSeq}>
                            {data.bpLow}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null}
                {alcoholClick ? (
                  <View style={styles.row}>
                    <Text style={styles.title}>??????</Text>
                    {alcoholList[0].map((data) => (
                      <View style={styles.boxSec}>
                        <View>
                          <Text key={data.otherSeq}>{data.otherTime}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ fontSize: 26, textAlign: "center" }}>
                            ????
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null}
                {coffeeClick ? (
                  <View style={styles.row}>
                    <Text style={styles.title}>??????</Text>
                    {coffeeList[0].map((data) => (
                      <View style={styles.boxSec}>
                        <View>
                          <Text key={data.otherSeq}>{data.otherTime}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ fontSize: 26, textAlign: "center" }}>
                            ???
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null}
                {exerciseClick ? (
                  <View style={styles.row}>
                    <Text style={styles.title}>??????</Text>
                    {exerciseList[0].map((data) => (
                      <View style={styles.boxSec}>
                        <View>
                          <Text key={data.otherSeq}>{data.otherTime}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ fontSize: 26, textAlign: "center" }}>
                            ????
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            ) : null}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CalendarCompo;

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  circle: { width: 15, height: 15, borderRadius: 50, marginRight: 3 },
  box: {
    backgroundColor: "white",
    paddingVertical: screenSize.height * 0.01,
    paddingHorizontal: screenSize.width * 0.04,
    margin: screenSize.width * 0.01,
    marginVertical: screenSize.height * 0.02,
    borderRadius: 10,
    elevation: 3,
    minWidth: screenSize.width * 0.88,
  },
  boxSec: {
    padding: 10,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 10,
  },
  date: {
    fontSize: 20,
    marginVertical: 5,
    marginLeft: 10,
  },
  numberText: {
    fontSize: 16,
    color: "black",
  },
  title: {
    fontSize: 20,
    padding: 10,
  },
});
