import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "./Pagination";
import DeleteModal from "./DeleteModal";
import axios from "axios";

import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const Home = ({ refetch }) => {
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const baseURL = "https://note-keeper-be-zen.onrender.com/all";
  const [todos, setTodo] = useState([]);
  const navigate = useNavigate();
  const notify = () => toast("Here is your toast.");

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = todos.slice(firstPostIndex, lastPostIndex);

  const [sample, setSample] = useState();

  useEffect(() => {
    fetch(`${baseURL}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(deletingNote)
        setTodo(data);
        
      });
  }, []);

  const editTodo = async (todo) => {
    console.log(todo);
    await navigate(`/edit/${todo._id}`, { state: todo });
  };

  const navigateNote = async (todo) => {
    await navigate(`/note/${todo._id}`, { state: todo });
  };

  const handlePinned = async (todo, index) => {
    let newUsers = [...todos];
    const rest = todos.filter((note) => note._id !== todo._id);
    toast.success(`"${todo.Task}" now is pinned`, {
      duration: 4000,
      position: "top-right",
    });
    newUsers = [todo, ...rest];
    setTodo(newUsers);
  };

  const deleteNote = async (todo) => {
    console.log(todo);
    setDeletingProduct(todo);
  };

  const sampleMap = (
    <>
      {currentPosts.map((todo, index, arr) => (
        <div
          key={index}
          className="card w-[350px] bg-neutral text-primary-content"
        >
          <div className="card-body">
            <h2 className="card-title">
              {index + 1} - {todo.Task}
            </h2>

            <p>{todo.tagline}</p>
            <div className="card-actions justify-end">
              <button
                onClick={() => handlePinned(todo, index, 0)}
                className="btn btn-outline bg-green-500 text-white btn-xs"
              >
                Pinned
              </button>
              <button
                onClick={() => navigateNote(todo)}
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
              <label
                className="btn btn-outline bg-red-500 text-white btn-xs"
                htmlFor="my-modal-6"
                onClick={() => deleteNote(todo)}
              >
                Delete
              </label>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  const handleError = (id) => {
    const agree = window.confirm("Not Complete?");
    const url = `https://note-keeper-be-zen.onrender.com/all/${id}`;
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
        {sampleMap}
      </div>
      {deletingProduct && (
        <DeleteModal
          deletingProduct={deletingProduct}
          setTodo={setTodo}
          todos={todos}
          setDeletingProduct={setDeletingProduct}
        ></DeleteModal>
      )}
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
