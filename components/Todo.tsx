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
    <div
      style={{
        padding: "1rem 2rem",
        border: "1px solid #ccc",
        margin: "0.5rem 0",
      }}
    >
      <div>
        {!(edit === todoKey) ? (
          <>{children}</>
        ) : (
          <input
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            style={{ border: "1px solid #ccc", padding: "0.5rem 1rem" }}
          />
        )}
      </div>
      <div>
        {edit !== todoKey ? (
          <button
            style={{ padding: "0.1rem 0.2rem" }}
            onClick={handleAddEdit(todoKey)}
          >
            Edit
          </button>
        ) : (
          <button style={{ padding: "0.1rem 0.2rem" }} onClick={handleSaveEdit}>
            Save
          </button>
        )}
      </div>
      <div>
        <button onClick={handleDeleteTodo(todoKey)}>Delete</button>
      </div>
    </div>
  );
};

export default Todo;
