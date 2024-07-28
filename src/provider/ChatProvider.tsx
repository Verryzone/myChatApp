import { View, Text, ActivityIndicator } from "react-native";
import React, { PropsWithChildren, useState } from "react";
import { useEffect } from "react";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuth } from "./AuthProvider";
import { recognizePrefixSuffix } from "react-native-reanimated/lib/typescript/reanimated2/animation/util";
import { supabase } from "../lib/supabase";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const ChatProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);
  const { profile } = useAuth();
  const { user } = useAuth();

  useEffect(() => {
    if (!profile) {
      return;
    }

    const connect = async () => {
      await client.connectUser(
        {
          id: profile.id,
          name: profile.full_name,
          image: supabase.storage
            .from("avatars")
            .getPublicUrl(profile.avatar_url).data.publicUrl,
        },
        client.devToken(user.id)
      );
      setIsReady(true);
      //   const channel = client.channel("messaging", "the_park", {
      //     name: "The Park",
      //   });
      //   await channel.watch();
    };

    connect();

    return () => {
      if (isReady) {
        client.disconnectUser();
      }
      setIsReady(false);
    };
  }, [profile?.id]);

  if (!isReady) {
    return <ActivityIndicator />;
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;
