import { StatusBar } from "expo-status-bar";
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [pushToken, setPushToken] = useState();
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus != "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus != "granted") {
        Alert.alert(
          "Permission Required",
          "Push notifications need the appropriate permissions"
        );
        return;
      }

      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;

      const pushTokenData = await Notifications.getExpoPushTokenAsync({
        projectId,
      });
      console.log("PushToken", pushTokenData);
      setPushToken(pushTokenData.data);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        const userName = notification.request.content.data.userName;
        console.log("NOTIFICATION RECEIVED", notification, userName);
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("NOTIFICATION RESPONSE", response);
        const userName = response.notification.request.content.data.userName;
        console.log("RESPONSE USERNAME", userName);
      }
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      trigger: { seconds: 5 },
      content: {
        title: "My First Local Notification",
        body: "This is the body of the notification",
        data: { userName: "Tim" },
      },
    });
  }

  function sendPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: pushToken,
        title: "Test - Sent from our device!",
        body: "This is a test!",
      }),
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Schedule Notification"
          onPress={scheduleNotificationHandler}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Send Push Notification"
          onPress={sendPushNotificationHandler}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 5,
  },
});
