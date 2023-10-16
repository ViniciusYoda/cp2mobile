import React, { useState } from 'react';
import { View, Text, Button, FlatList, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export function HomePage({ navigation }) {
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const addTodo = () => {
    const newTodo = { title: taskTitle, description: taskDescription };
    setTodos([...todos, newTodo]);
    setTaskTitle('');
    setTaskDescription('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <FlatList
        data={todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text>{item.title}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditTodo', { todo: item, index })}
                style={styles.editButton}
              >
                <Icon name="create" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const updatedTodos = [...todos];
                  updatedTodos.splice(index, 1);
                  setTodos(updatedTodos);
                }}
                style={styles.deleteButton}
              >
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Timer')} style={styles.startButton}>
                <Icon name="play" size={20} color="green" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Add to-do</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Task Manager</Text>
          <TextInput
            placeholder="Title"
            value={taskTitle}
            onChangeText={text => setTaskTitle(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Notes"
            value={taskDescription}
            onChangeText={text => setTaskDescription(text)}
            style={styles.notesInput}
            multiline={true}
          />
          <Button title="Save" onPress={addTodo} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0', 
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'blue',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'white', 
    padding: 8,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginLeft: 8,
  },
  deleteButton: {
    marginLeft: 8,
  },
  startButton: {
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: 'dodgerblue',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
    width: 90
  },
  addButtonText: {
    color: 'white',
  },
  modalContainer: {
    flex: 0.6,
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: 'black', 
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 8,
    color: 'white'
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    color: 'white'
  },
  notesInput: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    minHeight: 100,
    color: 'white'
  },
});
