import React from "react";
import "./styles.css";
import InputArea from "./Components/InputArea.js";
import ListArea from "./Components/ListArea.js";

export default function App() {
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem("todoList")) || []
  );
  const [taskName, setTaskName] = React.useState("");
  const [checked, setChecked] = React.useState([0]);
  const [isEditModeOn, setIsEditModeOn] = React.useState(false);
  const [editableId, setEditableId] = React.useState("");
  const [error, setError] = React.useState(false);

  let todoListJSON = JSON.stringify(todoList);
  React.useEffect(() => {
    localStorage.setItem("todoList", todoListJSON);
  }, [todoListJSON]);

  const handleChange = (event) => {
    let newTaskName = event.target.value;
    setTaskName(newTaskName);
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let todoObj = {};
    let newTodoList = [...todoList];
    let forDuplicateValue = todoList.filter(
      (todoItem) => todoItem.taskName === taskName
    );

    if (taskName) {
      if (isEditModeOn) {
        let objIndex = editableId;
        todoList[objIndex].taskName = taskName;
        setTaskName("");
      } else {
        if (forDuplicateValue.length) {
          setError(true);
        } else {
          setError(false);
          todoObj["id"] = `t${Math.floor(Math.random() * 90000) + 10000}`;
          todoObj["taskName"] = taskName;
          todoObj["lineThrough"] = false;
          newTodoList.unshift(todoObj);
          setTodoList(newTodoList);
          setTaskName("");
        }
      }
    } else {
      setError(true);
    }
    setIsEditModeOn(false);
  };

  const deleteTask = (event) => {
    event.stopPropagation();
    setIsEditModeOn(false);
    setError(false);
    let id = event.currentTarget.dataset.id;
    let newTodoList = todoList.filter((todoItem) => todoItem.id !== id);
    setTodoList(newTodoList);
    setTaskName("");
  };

  const handleToggle = (value) => (event) => {
    event.stopPropagation();
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    let newTodoList = [...todoList];
    let objIndex = newTodoList.findIndex((obj) => obj.id === value);

    setIsEditModeOn(false);
    setError(false);
    if (currentIndex === -1) {
      newChecked.push(value);
      newTodoList[objIndex].lineThrough = true;
    } else {
      newChecked.splice(currentIndex, 1);
      newTodoList[objIndex].lineThrough = false;
    }
    setTodoList(newTodoList);
    setChecked(newChecked);
    setTaskName("");
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    setIsEditModeOn(true);
    setError(false);
    setTaskName("");
    let id = event.currentTarget.dataset.id;
    let objIndex = todoList.findIndex((obj) => obj.id === id);
    let taskNameToUpdate = todoList[objIndex].taskName;
    setEditableId(objIndex);
    setTaskName(taskNameToUpdate);
  };

  const handleCancel = () => {
    setIsEditModeOn(false);
    setTaskName("");
  };

  return (
    <div className="App">
      <InputArea
        handleChange={handleChange}
        inputValue={taskName}
        handleSubmit={handleSubmit}
        isEditModeOn={isEditModeOn}
        handleCancel={handleCancel}
        error={error}
      />
      <ListArea
        todoList={todoList}
        deleteTask={deleteTask}
        handleToggle={handleToggle}
        checked={checked}
        handleEdit={handleEdit}
      />
    </div>
  );
}
