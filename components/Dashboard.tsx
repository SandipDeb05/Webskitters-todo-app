import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import Todo from "./Todo";
import { doc, setDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase";
import useFetchTodos from "@/hooks/fetchTodos";

const Dashboard = () => {
  const { userInfo, currentUser } = useAuth();
  const [edit, setEdit] = useState(null);
  const [todo, setTodo] = useState("");
  const [editedValue, setEditedValue] = useState("");

  const { todos, setTodos, loading, error } = useFetchTodos();

  useEffect(() => {
    if (!userInfo && Object.keys(userInfo).length === 0) {
      setAddTodo(true);
    }
  }, [userInfo]);

  const handleAddTodo = async () => {
    if (!todo) return;

    const newKey =
      Object.keys(todos).length === 0 ? 1 : Math.max(...Object.keys(todos)) + 1;
    setTodos({
      ...todos,
      [newKey]: todo,
    });

    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [newKey]: todo,
        },
      },
      { merge: true }
    );

    setTodo("");
  };

  const handleAddEdit = (todoKey) => {
    return () => {
      setEdit(todoKey);
      setEditedValue(todos[todoKey]);
    };
  };

  const handleSaveEdit = async () => {
    if (!editedValue) return;

    const newKey = edit;

    setTodos({
      ...todos,
      [newKey]: editedValue,
    });
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [newKey]: editedValue,
        },
      },
      { merge: true }
    );

    setEdit(null);
    setEditedValue("");
  };

  const handleDeleteTodo = (todoKey) => {
    return async () => {
      const tempObject = { ...todos };
      delete tempObject[todoKey];
      setTodos(tempObject);

      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userRef,
        {
          todos: {
            [todoKey]: deleteField(),
          },
        },
        { merge: true }
      );
    };
  };

  return (
    <div>
      <h1>Webskitters Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter todo"
          value={todo}
          style={{ padding: "0.5rem 1rem" }}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button style={{ padding: "0.5rem 1rem" }} onClick={handleAddTodo}>
          Add
        </button>
      </div>

      {loading && <h3>Loading...</h3>}

      {!loading && (
        <>
          {Object.keys(todos).map((todo, i) => {
            return (
              <Todo
                key={i}
                index={i}
                edit={edit}
                handleAddEdit={handleAddEdit}
                todoKey={todo}
                editedValue={editedValue}
                setEditedValue={setEditedValue}
                handleSaveEdit={handleSaveEdit}
                handleDeleteTodo={handleDeleteTodo}
              >
                {todos[todo]}
              </Todo>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Dashboard;
