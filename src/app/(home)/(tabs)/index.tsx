import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
} from "stream-chat-expo";
import { Link, router, Stack } from "expo-router";
import { useAuth } from "../../../provider/AuthProvider";
import { FontAwesome5 } from "@expo/vector-icons";

const MainTabScreen = () => {
  const { user } = useAuth();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href={'/(home)/users'} asChild>
              <FontAwesome5 name="users" size={22} color="gray" style={{marginHorizontal: 20}} />
            </Link>
          ),
        }}
      />
      <ChannelList
        filters={{ members: { $in: [user.id] } }}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
      />
    </>
  );
};

export default MainTabScreen;
