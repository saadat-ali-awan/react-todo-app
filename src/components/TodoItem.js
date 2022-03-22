import React, { useState, useEffect } from "react";
import styles from "./TodoItem.module.css";

function TodoItem(props) {
  const { completed, id, title } = props.todo;
  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  }
  const [state, setState] = useState({
    editing: false,
  });

  const handleEditing = () => {
    setState({
      editing: true,
    })
  }

  const [viewMode, setViewMode] = useState({
    display: "none"
  });
  const [editMode, setEditMode] = useState({
    display: "none"
  });
  useEffect(() => {

    if (state.editing) {
      setViewMode({
        display: "none"
      });
      setEditMode({
        display: "inline-block"
      });
    } else {
      setViewMode({
        display: "inline-block"
      });
      setEditMode({
        display: "none"
      });
    }
  }, [state]);

  const handleUpdatedDone = event => {
    if (event.key === "Enter") {
      setState({ editing: false })
    }
  }

  return (
    <li className={styles.item}>
      <div onDoubleClick={handleEditing} style={viewMode}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={() => props.handleChangeProps(id)}
        />
        <button onClick={() => props.deleteTodoProps(id)}>Delete</button>
        <span style={completed ? completedStyle : null}>{title}</span>
      </div>
      <input
        type="text"
        style={editMode}
        className={styles.textInput}
        value={title}
        onChange={e => {
          props.setUpdate(e.target.value, id)
        }}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  )
}

export default TodoItem