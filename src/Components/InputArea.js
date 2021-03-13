import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  addButton: {
    width: "5ch"
  }
}));

export default function InputArea(props) {
  const classes = useStyles();

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={props.handleSubmit}
    >
      <TextField
        error={props.error}
        id="standard-basic"
        label="Type in.."
        value={props.inputValue}
        onChange={props.handleChange}
        helperText={props.error ? "Incorrect entry" : ""}
      />

      <Button
        className={classes.addButton}
        variant="contained"
        color="primary"
        type="submit"
      >
        {props.isEditModeOn ? "Update" : "Add"}
      </Button>
      {props.isEditModeOn ? (
        <Button
          className={classes.addButton}
          variant="contained"
          onClick={props.handleCancel}
        >
          Cancel
        </Button>
      ) : (
        ""
      )}
    </form>
  );
}
