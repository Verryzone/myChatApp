import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Channel as ChannelType} from 'stream-chat'
import { Channel, MessageInput, MessageList, useChatContext } from 'stream-chat-expo'
import { SafeAreaView } from 'react-native-safe-area-context'

const ChannelScreen = () => {
  const [channel, setChannel] = useState<ChannelType | null>();
  const {cid} = useLocalSearchParams<{cid: string}>();

  const {client} = useChatContext();

  useEffect(() => {
    const fetchChannel = async() => {
        const resp = await client.queryChannels({cid});
        setChannel(resp[0]);
    }
    fetchChannel()
  }, [cid]) 

  if(!channel) {
    return <ActivityIndicator />
  }

  return (
    <Channel channel={channel}>
        <MessageList/>
        <SafeAreaView edges={['bottom']}>
            <MessageInput/>
        </SafeAreaView>
    </Channel>
  )
}

export default ChannelScreen