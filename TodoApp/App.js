import React, { useState } from "react";
import {
    StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard
} from "react-native";
import Header from "./components/header";
import TodoItem from "./components/todoItem";
import AddTodo from "./components/addTodo";
import Sandbox from "./components/sandbox";

export default function App() {
    const [todos, setTodos] = useState([
        { text: 'beli kopi', key: '1' },
        { text: 'bikin aplikasi', key: '2' },
        { text: 'main game', key: '3' }
    ]);

    const pressHandler = (key) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.key != key)
        })
    }

    const submitHandler = (text) => {

        if (text.length > 3) {
            setTodos((prevTodos) => {
                return [
                    { text: text, key: Math.random().toString() },
                    ...prevTodos
                ]
            });
        }
        else {
            Alert.alert('Opps!', 'Harus lebih dari 3 karakter', [
                { text: 'OK', onPress: () => console.log('alert closed') }
            ]);
        }
    }

    return (
        // <Sandbox />
        <TouchableWithoutFeedback onPress={() => {
            console.log('keyboard tutup')
        }}>
            <View style={styles.container}>
                {/* header */}
                <Header />
                <View style={styles.content} >
                    {/* to form */}
                    <AddTodo submitHandler={submitHandler} />
                    <View style={styles.list}>
                        <FlatList
                            data={todos}
                            renderItem={({ item }) => (
                                <TodoItem item={item} pressHandler={pressHandler} />
                            )} />
                    </View>
                </View>

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    content: {
        padding: 40,

        flex: 1
    },
    list: {
        marginTop: 20,
        flex: 1
    }
})