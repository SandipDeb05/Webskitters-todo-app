import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/authContext";
import { db } from "../firebase";

const useFetchTodos = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTodos(docSnap.data().todos);
        } else {
          setTodos({});
        }
      } catch (error) {
        setError("Failed to load todos");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { loading, error, todos, setTodos };
};

export default useFetchTodos;
