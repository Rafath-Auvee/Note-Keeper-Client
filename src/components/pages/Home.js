import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "./Pagination";

const Home = () => {
  const [oinned, setPinned] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const baseURL = "http://localhost:5000/all";
  const [todos, setTodo] = useState([]);
  const navigate = useNavigate();
  const notify = () => toast("Here is your toast.");

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = todos.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    fetch(`${baseURL}`)
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
      });
  }, [todos]);

  const editTodo = async (todo) => {
    console.log(todo);
    await navigate(`/edit/${todo._id}`, { state: todo });
  };
  const navigateNote = async (todo) => {
    await navigate(`/note/${todo._id}`, { state: todo });
  };
  const handlePinned = async (todo, array, from, to) => {
    console.log(array)
    return array.splice(to, 0, array.splice(from, 1)[0])
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
      <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[50px]">
        {currentPosts.map((todo, index, arr) => (
          <div
            key={index}
            className="card w-[350px] bg-neutral text-primary-content"
          >
            <div className="card-body">
              <h2 className="card-title">{index+1} - {todo.Task}</h2>

              <p>{todo.tagline}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => handlePinned(todo, arr, index, 0 )}
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
      <div className="grid justify-items-center mt-[100px]">
        <Pagination
          totalPosts={todos.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Home;
