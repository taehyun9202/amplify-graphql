import Link from "next/link";
import React, { useState } from "react";

const VerifyForgotPassword = ({ onChangeHandler, verifyForgotPassword }) => {
  const [showCode, setShowCode] = useState(false);
  const [showPW, setShowPW] = useState(false);
  return (
    <div className="max-w-7xl mx-auto flex flex-col justify-center items-center min-h-screen">
      <div className="shadow-lg px-10 md:px-20 py-10">
        <p className="text-2xl font-bold">Verification code has been sent!</p>
        <div>
          <div className="grid grid-cols-2 my-6">
            <div className="relative col-span-2 flex flex-col my-2 ml-5">
              <label className="text-sm font-semibold">Verification code</label>
              <input
                onChange={onChangeHandler}
                type={showCode ? "text" : "password"}
                name="authCode"
                className="h-8 border-b-2 outline-none px-2"
              />
              {showCode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-2 top-5 mt-0.5 h-6 w-6 cursor-pointer text-gray-500 hover:text-black"
                  onClick={() => setShowCode(false)}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-2 top-5 mt-0.5 h-6 w-6 cursor-pointer text-gray-500 hover:text-black"
                  onClick={() => setShowCode(true)}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              )}
            </div>

            <div className="relative col-span-2 flex flex-col my-2 ml-5">
              <label className="text-sm font-semibold">New password</label>
              <input
                onChange={onChangeHandler}
                type={showPW ? "text" : "password"}
                name="password"
                className="h-8 border-b-2 outline-none px-2"
              />
              {showPW ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-2 top-5 mt-0.5 h-6 w-6 cursor-pointer text-gray-500 hover:text-black"
                  onClick={() => setShowPW(false)}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-2 top-5 mt-0.5 h-6 w-6 cursor-pointer text-gray-500 hover:text-black"
                  onClick={() => setShowPW(true)}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              )}
            </div>
            <button
              className="col-span-2 mt-4 text-lg font-bold flex gap-4 justify-center items-center bg-pink-400 rounded px-4 py-2"
              onClick={() => {
                verifyForgotPassword();
              }}
            >
              Submit Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyForgotPassword;
