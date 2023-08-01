import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const handleAppStateChange = async (nextAppState) => {
    if (nextAppState === "background" || nextAppState === 'inactive') {
      try {
        await AsyncStorage.setItem('data', JSON.stringify(notes));
      } 

      catch {
        console.log("Error saving data to AsyncStorage", error);
      }
    }
  }

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)
  }, [])

  useEffect(() => {
    const getDataFromAsyncStorage = async () => {
      try {
        const data = await AsyncStorage.getItem('data');
        if (data !== null) {
          setNotes(JSON.parse(data));
        }

        else {
          console.log("No data found in async storage");
        }
      }

      catch (error) {
        console.log("Error while retrieving data from AsyncStorage", error);
      }
    }

    getDataFromAsyncStorage();
  }, [])

  const handleAddNewNote = () => {
    setNotes([...notes, newNote]);
    setNewNote('');
  };

  const handleRemoveNote = (idx) => {
    let notesCopy = JSON.parse(JSON.stringify(notes));
    notesCopy.splice(idx, 1);
    setNotes(notesCopy);
  }

  return (
    <View style={appStyles.container}>
      <ScrollView style={notesListStyle.style}>
        {notes.map((note, idx) => {
          return (
            <View style={taskContainerStyles.container} key={idx}>
              <Text style={notesStyles.style}>{note}</Text>
              <Button onPress={() => {handleRemoveNote(idx)}} title={'remove'}/>
            </View>
          )
        })}
        <View style={taskContainerStyles.container}>
          <TextInput style={textInputStyle.style} onChangeText={setNewNote} value={newNote} multiline={true}/>
        </View>

        <Button onPress={handleAddNewNote} style={taskContainerStyles.container} title="+ Add New Note">
        </Button>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const textInputStyle = StyleSheet.create({
  style: {
    display: 'flex',
    flex: 1
  }
});

const notesStyles = StyleSheet.create({
  style: {
    display: 'flex',
    flex: 1,
    width: 25,
    marginRight: 5
  }
});

const notesListStyle = StyleSheet.create({
  style: {
    display: "flex",
    flex: 1,
    width: 250,
    marginTop: 50
  }
})

const appStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: "column",
    flex: 1,
    backgroundColor: '#698dc7',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const taskContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#fff',
    color: '#000',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
    justifyContent: 'space-between',
  },
});
