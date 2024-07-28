import { Stack, Slot, Redirect } from "expo-router";
import ChatProvider from "../../provider/ChatProvider";
import { useAuth } from "../../provider/AuthProvider";


export default function HomeLayout() {
  const {user} = useAuth();

  if(!user) {
      return <Redirect href="/(auth)/login"/>
  }

  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false,}} />
      </Stack>
    </ChatProvider>
  );
}
