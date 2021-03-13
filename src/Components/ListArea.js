import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: "auto"
  },
  moveLeft: {
    right: "50px"
  },
  strikeOut: {
    textDecoration: "line-through !important"
  }
}));

export default function CheckboxList(props) {
  const classes = useStyles();
  const todoList = props.todoList;

  return (
    <List className={classes.root}>
      {todoList.map((task) => {
        const labelId = `checkbox-list-label-${task.id}`;

        return (
          <ListItem
            key={task.id}
            role={undefined}
            className={task.lineThrough ? classes.strikeOut : ""}
            dense
            button
            onClick={props.handleToggle(task.id)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={props.checked.indexOf(task.id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={task.taskName} />
            <ListItemSecondaryAction
              className={classes.moveLeft}
              onClick={props.handleEdit}
              data-id={task.id}
              disabled={task.lineThrough ? "disabled" : ""}
            >
              <IconButton edge="end" aria-label="edit">
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
            <ListItemSecondaryAction
              data-id={task.id}
              onClick={props.deleteTask}
              disabled={task.lineThrough ? "disabled" : ""}
            >
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
