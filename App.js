import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const handleAddNewNote = () => {
    setNotes([...notes, newNote]);
    setNewNote('');
  };

  return (
    <View style={appStyles.container}>
      <ScrollView style={notesListStyle.style}>
        {notes.map((note, idx) => {
          return (
            <View style={taskContainerStyles.container} key={idx}>
              <Text>{note}</Text>
            </View>
          )
        })}
        <View style={taskContainerStyles.container}>
          <TextInput onChangeText={setNewNote} value={newNote}/>
        </View>

        <Button onPress={handleAddNewNote} style={taskContainerStyles.container} title="+ Add New Note">
        </Button>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

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
    backgroundColor: '#fff',
    color: '#000',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
    justifyContent: 'center',
  },
});
