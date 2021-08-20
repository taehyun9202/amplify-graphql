import React from "react";
import { Auth } from "aws-amplify";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const SocialSignIn = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-10">
      <button
        className="text-lg font-bold flex gap-4 justify-center items-center hover:bg-gray-100 rounded px-4 py-2 transition-colors duration-300"
        onClick={() => Auth.federatedSignIn({ provider: "Google" })}
      >
        <FaGoogle size="24" className="text-pink-600" />
        <span>Sign up with Google</span>
      </button>
      <button
        className="text-lg font-bold flex gap-4 justify-center items-center hover:bg-gray-100 rounded px-4 py-2 transition-colors duration-300"
        onClick={() => Auth.federatedSignIn({ provider: "Facebook" })}
      >
        <FaFacebookF size="24" className="text-indigo-600" />
        <span>Sign up with Facebook</span>
      </button>
    </div>
  );
};

export default SocialSignIn;
