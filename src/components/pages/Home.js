import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {

  const [noteData, setNoteData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  const baseURL = "http://localhost:5000/all";
  const [todos, setTodo] = useState([]);
  const navigate = useNavigate();
  const notify = () => toast("Here is your toast.");

  useEffect(() => {
    fetch(`${baseURL}`)
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
      });
  }, [todos]);

  const editTodo = async (todo) => {
    console.log(todo)
    await navigate(`/edit/${todo._id}`, { state: todo });
  };
  const navigateNote = async (todo) => {
    await navigate(`/note/${todo._id}`, { state: todo });
  };

  const confirmDelete = async (id) => {
    const agree = window.confirm("Confirm?");
    if (agree) {
      const url = `http://localhost:5000/all/${id}`;
      console.log(id);
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const remaining = todos.filter((todo) => todo._id !== id);
          setTodo(remaining);
        });
    }
  };

  const handleComplete = (id) => {
    const agree = window.confirm("Complete?");
    const url = `http://localhost:5000/all/${id}`;
    fetch(`${url}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    }).then((res) => res.json().then((data) => {}));
  };

  const handleError = (id) => {
    const agree = window.confirm("Not Complete?");
    const url = `http://localhost:5000/all/${id}`;
    fetch(`${url}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    }).then((res) => res.json().then((data) => {}));
  };

  return (
    <div className=" mx-[100px] my-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[50px]">
        {todos.map((todo, index) => (
          <div
            key={index}
            className="card w-[350px] bg-neutral text-primary-content"
          >
            <div className="card-body">
              <h2 className="card-title">{todo.Task}</h2>

              <p>{todo.tagline}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleComplete(todo._id)}
                  className="btn btn-outline bg-green-500 text-white btn-xs"
                >
                  Pinned
                </button>
                <button
                  onClick={() => navigateNote(todo._id)}
                  className="btn btn-outline bg-blue-500 text-white btn-xs"
                >
                  Read More
                </button>
                <button
                  className="btn btn-outline bg-amber-500 text-white btn-xs"
                  onClick={() => editTodo(todo)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline bg-red-500 text-white btn-xs"
                  onClick={() => confirmDelete(todo._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
