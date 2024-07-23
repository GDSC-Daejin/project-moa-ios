import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function DropDownComponent() {
  const [dayOpen, setDayOpen] = useState(false);
  const [dayValue, setDayValue] = useState(null);
  const [timeOpen, setTimeOpen] = useState(false);
  const [timeValue, setTimeValue] = useState(null);

  const [dayItems, setDayItems] = useState([
    { label: "D-5", value: "1" },
    { label: "D-4", value: "2" },
    { label: "D-3", value: "3" },
    { label: "D-2", value: "4" },
    { label: "D-1", value: "5" },
  ]);

  const generateTimeItems = () => {
    const times = [];
    for (let hour = 10; hour <= 23; hour++) {
      const label = `${hour < 10 ? `0${hour}` : hour}:00`;
      times.push({ label, value: label });
    }
    times.push({ label: "00:00", value: "00:00" });
    return times;
  };

  const [times, setTimes] = useState(generateTimeItems());

  return (
    <View style={styles.dropDownContainer}>
      <DropDownPicker
        open={dayOpen}
        value={dayValue}
        items={dayItems}
        setOpen={setDayOpen}
        setValue={setDayValue}
        setItems={setDayItems}
        style={styles.dropDown}
        containerStyle={styles.dropDownContainerStyle}
        placeholder="D-5"
        dropDownContainerStyle={{ maxHeight: 150 }}
      />
      <DropDownPicker
        open={timeOpen}
        value={timeValue}
        items={times}
        setOpen={setTimeOpen}
        setValue={setTimeValue}
        setItems={setTimes}
        style={styles.dropDown}
        containerStyle={styles.dropDownContainerStyle}
        placeholder="10:00"
        maxHeight={200}
        dropDownContainerStyle={{ maxHeight: 150 }}
        listMode="SCROLLVIEW"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropDownContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  dropDownContainerStyle: {
    flex: 0.3,
  },

  dropDown: {
    borderWidth: 0,
  },
});
