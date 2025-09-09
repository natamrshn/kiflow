import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native-svg";

const CoursesScreen = () => {
    const router = useRoute();
    const { courseId, slideIndex } = useLocalSearchParams<{
      courseId?: string;
      slideIndex?: string;
    }>();
  return (
    <Text>{courseId}</Text>
  );
};

export default CoursesScreen;

