const Todo = (props: { children: any; edit: any; setEdit: any }) => {
  const {
    children,
    edit,
    handleAddEdit,
    editedValue,
    setEditedValue,
    todoKey,
    handleSaveEdit,
    handleDeleteTodo,
  } = props;

  return (
    <div className="todo-container">
      <div className="todo-text">
        {!(edit === todoKey) ? (
          <>{children}</>
        ) : (
          <input
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="todo-edit-input"
          />
        )}
      </div>
      <div>
        {edit !== todoKey ? (
          <button className="todo-button" onClick={handleAddEdit(todoKey)}>
            Edit
          </button>
        ) : (
          <button className="todo-button" onClick={handleSaveEdit}>
            Save
          </button>
        )}
      </div>
      <div>
        <button
          disabled={edit === todoKey}
          className={
            edit === todoKey
              ? "disabled-button todo-button todo-delete-button"
              : "todo-button todo-delete-button"
          }
          onClick={handleDeleteTodo(todoKey)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
