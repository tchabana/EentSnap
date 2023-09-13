import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import api from '../api/api';
const UserList = () => { 
    const [users, setUsers] = useState([]); 
    useEffect(() => {    
        api.get('/user')       
        .then(response => setUsers(response.data.data))       
        .catch(error => console.error(error));
    }, []);    
    return (<ScrollView>
                <View style={styles.comment}>       
                    <Text style={styles.f}> Liste des utilisateurs :</Text>       
                    <Text style={styles.ff}>{users.map(user => (<Text key={user.id}>{user.name} - {user.email}</Text>))}</Text>     
                </View>
            </ScrollView>); 
        };

const styles = StyleSheet.create({
    comment: {
        paddingVertical: 20,
        paddingRight: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor:'green',
    },
    f: {
        color:'red',
        fontSize:28,
        paddingBottom: 15,
        alignItems: 'center',
    }, 
    ff: {
        fontSize:16,
        paddingBottom: 15,
        alignItems: 'center',
    },
});
export default UserList;