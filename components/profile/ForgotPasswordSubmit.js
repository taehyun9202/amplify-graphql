import Link from "next/link";
import React, { useState } from "react";

const ForgotPasswordSubmit = ({
  onChangeHandler,
  setUiState,
  forgotPasswordSubmit,
}) => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col justify-center items-center min-h-screen">
      <div className="shadow-lg px-10 md:px-20 py-10">
        <p className="text-2xl font-bold">Forgot Password?!</p>
        <div>
          <div className="flex flex-col w-80 my-6">
            <div className="relative flex flex-col my-2 ml-5">
              <label className="text-sm font-semibold">Email Address</label>
              <input
                onChange={onChangeHandler}
                type="text"
                name="email"
                className="h-8 border-b-2 outline-none px-2"
              />
            </div>
            <button
              className="mt-4 text-lg font-bold flex gap-4 justify-center items-center bg-pink-400 rounded px-4 py-2"
              onClick={() => {
                forgotPasswordSubmit();
              }}
            >
              Reset Password
            </button>
          </div>

          <div className="pt-4">
            <p onClick={() => setUiState("signIn")} className="font-medium">
              Back to sign in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordSubmit;
