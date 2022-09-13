import React, { useState, useRef } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

const EditNote = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const { _id, Task, Description, tagline } = location.state;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (e) => {
    // e.preventDefault();
    const Task = e.TaskName;
    const Description = e.TaskDescription;
    const tagline = e.tagline;

    const task = {
      Task,
      Description,
      tagline,
    };

    console.log(task);

    const api = `https://note-keeper-be-zen.onrender.com/edit/${_id}`;
    fetch(api, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Working and the Data", data);
        toast.success(`Note Edited Successfully`, {
          duration: 4000,
          position: "top-right",
        });
        reset();
      })
      .catch((error) => {
        toast.error(`${error} - Something Went Wrong`, {
          duration: 4000,
          position: "top-right",
        });
      });
  };


  return (
    <div className={`max-w-screen-md mx-auto p-5 mt-5 pt-6 h-screen`}>
      <div className="text-center mb-16">
        <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
          Edit <span className="text-indigo-600">Note</span>
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide  text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Task Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder={Task}
              name="TaskName"
              {...register("TaskName", {
                required: {
                  value: true,
                  message: "TaskName is Required",
                },
              })}
            />

            {errors.TaskName && errors.TaskName.type === "required" && (
              <p className="text-xl font-bold" style={{ color: "red" }}>
                Task Name Required.
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide  text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              tagline
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="tagline"
              id="grid-last-name"
              type="text"
              placeholder={tagline}
              {...register("tagline", {
                required: {
                  value: true,
                  message: "Tagline is Required",
                },
              })}
            />
            {/* <ErrorMessage errors={errors} name="tagline" as="p" /> */}
            {errors.tagline && errors.tagline.type === "required" && (
              <p className="text-xl font-bold" style={{ color: "red" }}>
                Task Tagline Required.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide  text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Task Description
            </label>
            <textarea
              rows="10"
              className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="TaskDescription"
              placeholder={Description}
              {...register("TaskDescription", {
                required: {
                  value: true,
                  message: "TaskDescription is Required",
                },
              })}
            ></textarea>
            {errors.TaskDescription &&
              errors.TaskDescription.type === "required" && (
                <p className="text-xl font-bold mb-2" style={{ color: "red" }}>
                  Task Description Required.
                </p>
              )}
          </div>
          <div className="flex justify-between w-full px-3">
            <button
              className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
              type="submit"
            >
              Done
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
