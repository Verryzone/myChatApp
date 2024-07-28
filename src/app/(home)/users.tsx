import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../provider/AuthProvider";
import UserListItem from "../../component/UserListItem";

const UsersScreen = () => {
  const [users, setUsers] = useState([]);
  const {user} = useAuth();

  useEffect(() => {
    const fetchUser = async() => {
        let {data: profiles, error} = await supabase
            .from('profiles')
            .select('*')
            .neq('id', user.id)

        setUsers(profiles)
    }
    fetchUser()
  }, [])

  return (
    <FlatList
    contentContainerStyle={{gap: 5}}
      data={users}
      renderItem={({ item }) => <UserListItem user={item}/>}
    />
  );
};

export default UsersScreen;
