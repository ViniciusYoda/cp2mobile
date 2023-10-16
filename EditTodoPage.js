import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export function EditTodoPage({ route, navigation }) {
  const { todo, index, onEditTodo } = route.params;
  const [editedTodo, setEditedTodo] = useState(todo);

  const saveChanges = () => {
   
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit To-Do</Text>
      <TextInput
        value={editedTodo.title}
        onChangeText={(text) => setEditedTodo({ ...editedTodo, title: text })}
        style={styles.input}
        placeholder="Title"
      />
      <TextInput
        value={editedTodo.description}
        onChangeText={(text) => setEditedTodo({ ...editedTodo, description: text })}
        style={styles.input}
        placeholder="Description"
      />
      <Button title="Save" onPress={saveChanges} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});
