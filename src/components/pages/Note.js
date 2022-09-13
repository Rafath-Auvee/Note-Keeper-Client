import React, { useState, useRef } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

const Note = () => {
  const { id } = useParams();
  const location = useLocation();
  const { _id, Task, Description, tagline, time } = location.state;

  return (
    <article className="p-6  sm:p-8 bg-white ring ring-indigo-50">
      <div className="flex items-start">
        <div
          className="hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
          aria-hidden="true"
        >
          <div className="flex items-center gap-1">
            <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
          </div>
        </div>

        <div className="sm:ml-8">
          <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
            {Task}
          </strong>

          <h2 className="mt-4 text-lg font-medium sm:text-xl">
            <a href="" className="hover:underline">
              {tagline}
            </a>
          </h2>

          <p className="mt-1 text-sm text-gray-700">
          {Description}
          </p>

          <div className="mt-4 sm:flex sm:items-center sm:gap-2">
            <div className="flex items-center text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <p className="ml-1 text-xs font-medium">{time}</p>
            </div>

            <span className="hidden sm:block" aria-hidden="true">
              &middot;
            </span>

            
          </div>
        </div>
      </div>
    </article>
  );
};

export default Note;
