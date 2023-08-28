import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import Todo from "./Todo";
import { doc, setDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase";
import useFetchTodos from "@/hooks/fetchTodos";

// TODO Google analytics
import ReactGA from "react-ga4";
ReactGA.initialize("G-BRS748Q3CM");

const Dashboard = () => {
  const { userInfo, currentUser } = useAuth();
  const [edit, setEdit] = useState<string | null>(null);
  const [todo, setTodo] = useState<string>("");
  const [editedValue, setEditedValue] = useState<string>("");

  const { todos, setTodos, loading, error } = useFetchTodos();

  // TODO page view event
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/my-path",
      title: "Custom Title",
    });
  }, []);

  useEffect(() => {
    if (!userInfo && Object.keys(userInfo).length === 0) {
      setTodo("");
    }
  }, [userInfo]);

  const handleAddTodo = async () => {
    if (!todo) return;

    const newKey =
      Object.keys(todos).length === 0
        ? "1"
        : String(Math.max(...Object.keys(todos).map(Number)) + 1);

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

    // TODO Interaction event
    ReactGA.event({
      category: "TODOs",
      action: "Added a TODO",
      label: todo,
      value: 99, // optional, must be a number
      transport: "xhr", // optional, beacon/xhr/image
    });

    setTodo("");
  };

  const handleAddEdit = (todoKey: any) => {
    return () => {
      setEdit(todoKey);
      setEditedValue(todos[todoKey]);
    };
  };

  const handleSaveEdit = async () => {
    if (!editedValue) return;

    const newKey: any | null = edit;

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

  const handleDeleteTodo = (todoKey: any) => {
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
    <div className="dashboard-container">
      <h1 className="dashboard-title">Webskitters Todo App GA</h1>
      <div className="todo-input-container">
        <input
          type="text"
          placeholder="Enter todo"
          value={todo}
          className="todo-input"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="todo-add-button" onClick={handleAddTodo}>
          Add
        </button>
      </div>

      {loading && <h3 className="loading-text">Loading...</h3>}

      {!loading && (
        <div className="todo-list">
          {Object.keys(todos).map((todo, i) => {
            return (
              <Todo
                key={i}
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
        </div>
      )}
    </div>
  );
};

export default Dashboard;
