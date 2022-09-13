import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const DeleteModal = ({
  deletingProduct,
  refetch,
  setDeletingProduct,
  todos,
  setTodo

}) => {
  const { _id, Task, Description, tagline } = deletingProduct;

  const baseURL = "https://note-keeper-be-zen.onrender.com/all";
  

  const confirmDelete = async () => {
    console.log("first");
    const url = `https://note-keeper-be-zen.onrender.com/all/${_id}`;
    console.log(_id);
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success(`${Task} is removed`, {
            duration: 4000,
            position: "top-right",
          });
          const fillteredTodo = todos.filter((note)=> note._id !== _id);
          setDeletingProduct(null);
          setTodo(fillteredTodo)
        }
      });
  };

  console.log("first");
  console.log(deletingProduct);
  return (
    <div>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to remove {Task}?
          </h3>
          {/* <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p> */}
          <div className="modal-action">
            <button onClick={() => confirmDelete()} className="btn btn-error">
              Yes
            </button>
            <label htmlFor="my-modal-6" className="btn">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

// <input type="checkbox" id="delete-order-modal" className="modal-toggle" />
// <div className="modal modal-bottom sm:modal-middle">
//   <div className="modal-box">
//     <h3 className="font-bold text-lg text-red-500">
//       Are you sure you want to remove {Task}?
//     </h3>
//     <div className="modal-action">
//       <button onClick={() => confirmDelete()} className="btn btn-error">
//         Yes
//       </button>
//       <label htmlFor="delete-order-modal" className="btn">
//         Cancel
//       </label>
//     </div>
//   </div>
// </div>
