import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  Input,
  Button,
  Checkbox,
  List,
  Link,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

import { logout, showLoginForm } from "../../slices/user";
import {
  addTodo,
  deleteTodo,
  markTodoAsDone,
  clearAll,
} from "../../slices/todo";

function TodoList() {
  const classes = useStyles();

  const [todoInput, setTodoInput] = useState("");
  const todoList = useSelector((state) => state.todo.todoList);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  const addItem = () => {
    if (todoInput) {
      const todoObject = { id: uuidv4(), value: todoInput };
      dispatch(addTodo(todoObject));
      setTodoInput("");
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const markAsDone = (itemToMarkAsDone) => {
    const index = todoList.findIndex((item) => item.id === itemToMarkAsDone.id);
    dispatch(markTodoAsDone(index));
  };

  const deleteItem = (itemToDelete) => {
    const index = todoList.findIndex((item) => item.id === itemToDelete.id);
    dispatch(deleteTodo(index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const signout = () => {
    dispatch(logout());
    dispatch(clearAll());
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TODO
          </Typography>

          {username ? (
            <div>
              <Typography>
                Hello {username},{" "}
                <Link color="inherit" href="#" onClick={signout}>
                  logout
                </Link>
              </Typography>
            </div>
          ) : (
            <Button color="inherit" onClick={() => dispatch(showLoginForm())}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <form onSubmit={handleSubmit} className={classes.form}>
        <Input
          placeholder="What you want to do?"
          inputProps={{
            "aria-label": "Description",
          }}
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          onKeyPress={onKeyPress}
          className={classes.textInput}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.addInput}
          onClick={addItem}
        >
          Add
        </Button>
      </form>
      <List>
        {todoList.map((item) => (
          <ListItem key={item.id}>
            <Checkbox onClick={() => markAsDone(item)} />
            <ListItemText
              className={item.done ? "done" : ""}
              primary={item.value}
            ></ListItemText>

            <DeleteIcon onClick={() => deleteItem(item)} value="delete" />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default TodoList;

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    padding: theme.spacing(5, 0, 0),
  },
  textInput: {
    width: "90%",
  },
  addInput: {
    width: "10%",
    marginLeft: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));
