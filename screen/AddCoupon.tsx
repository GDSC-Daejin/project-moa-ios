import { useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { Colors, Size } from "../style/style";
import CategorySelector from "../components/CategorySelector";
import { Switch, TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import AddCouponList from "../components/AddCouponList";
import Modal from "../components/Modal";
import Ocr from "../components/lib/Ocr";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ListParam } from "../type/type";

export default function AddCoupon() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [ocrData, setOcrData] = useState<any>(null);

  const storage = getStorage();
  const navigation = useNavigation<StackNavigationProp<ListParam>>();

  const categoryList = [
    { id: "Category_all", label: "전체" },
    { id: "Category_starbucks", label: "스타벅스" },
    { id: "Category_oliveyoung", label: "올리브영" },
    { id: "Category_plus", label: "+" },
  ];

  const handleClick = (id: string) => {
    setSelectedCategory(id);
  };

  const handlePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setImage(selectedImageUri);
      await setStorage(selectedImageUri);
    } else {
      return;
    }
  };

  const setStorage = async (uri: string) => {
    try {
      const filename = uri.substring(uri.lastIndexOf("/") + 1);
      const storageRef = ref(storage, `images/${filename}`);

      const response = await fetch(uri);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      setDownloadUrl(url);
      setShow(true);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleOpen = () => {};

  const handleOcrData = (data: any) => {
    setOcrData(data);
  };

  const handleCancel = () => {
    navigation.navigate("Bottom", { screen: "Coupon" });
  };

  return (
    <View style={styles.container}>
      {show && (
        <Modal downloadUrl={downloadUrl} setShow={setShow} ocrData={ocrData} />
      )}
      <Ocr downloadUrl={downloadUrl} onDataExtracted={handleOcrData} />

      <View style={styles.contentContainer}>
        <View style={styles.subContainer}>
          <View style={styles.title}>
            <Text style={styles.mainText}>쿠폰추가</Text>
          </View>
        </View>
        <View style={styles.addCouponImgContainer}>
          <Text style={styles.CouponFont}>쿠폰</Text>
          <Pressable
            onPress={handlePress}
            style={({ pressed }) => pressed && styles.pressedButton}
          >
            <Text style={[styles.CouponFont, styles.addCouponFont]}>
              + 이미지 추가하기
            </Text>
          </Pressable>
        </View>
        <CategorySelector
          categoryList={categoryList}
          selectedCategory={selectedCategory}
          onSelectCategory={handleClick}
        />
        <View style={styles.shareContainer}>
          <Text style={styles.CouponFont}>공유방</Text>
          <AddCouponList />
        </View>
        <View style={styles.priceContainer}>
          <Text>금액</Text>
          <Switch />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.selectButton,
              pressed && styles.pressed,
            ]}
            onPress={handleCancel}
          >
            {({ pressed }) => (
              <Text style={[styles.selectFont, pressed && styles.pressedText]}>
                취소
              </Text>
            )}
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.selectButton,
              pressed && styles.pressed,
            ]}
            onPress={handleOpen}
          >
            {({ pressed }) => (
              <Text style={[styles.selectFont, pressed && styles.pressedText]}>
                확인
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  contentContainer: {
    flex: 1,
    zIndex: 1,
  },

  title: {
    paddingBottom: 12,
    borderBottomColor: Colors.MoaGray.gray100,
    borderBottomWidth: 1,
  },

  subContainer: {
    top: 70,
  },

  mainText: {
    fontSize: Size.body2Medium16,
    textAlign: "center",
    fontWeight: "bold",
  },

  addCouponImgContainer: {
    flexDirection: "row",
    width: "100%",
    top: 78,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomColor: Colors.MoaGray.gray100,
    borderBottomWidth: 7,
    paddingVertical: 30,
  },

  CouponFont: {
    fontSize: Size.body2Medium16,
  },

  addCouponFont: {
    color: Colors.MoaCarrot.carrot700,
  },

  shareContainer: {
    top: 128,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomColor: Colors.MoaGray.gray100,
    borderBottomWidth: 7,
  },

  priceContainer: {
    top: 164,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  pressedButton: {
    opacity: 0.6,
  },

  pressed: {
    backgroundColor: Colors.MoaCarrot.carrot700,
  },

  pressedText: {
    color: "white",
  },

  buttonContainer: {
    top: "80%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  selectButton: {
    width: "48%",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.MoaGray.gray200,
  },

  selectFont: {
    color: Colors.MoaGray.gray400,
  },

  showBox: {
    top: "100%",
    height: "20%",
    width: "100%",
  },

  addCouponList: {
    height: "100%",
    top: "0%",
    bottom: 0,
    backgroundColor: "black",
    borderStartStartRadius: 20,
    borderStartEndRadius: 20,
  },
});
