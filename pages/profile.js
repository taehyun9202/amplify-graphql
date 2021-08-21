import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import SignIn from "../components/profile/SignIn";
import SignUp from "../components/profile/SignUp";
import ConfirmSignUp from "../components/profile/ConfirmSignUp";
import ForgotPasswordSubmit from "../components/profile/ForgotPasswordSubmit";
import VerifyForgotPassword from "../components/profile/VerifyForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logOut } from "../store/actions/profileAction";
import { useRouter } from "next/dist/client/router";

const initialState = { email: "", password: "", authCode: "" };

const Profile = () => {
  const [uiState, setUiState] = useState("signIn");
  const [formState, setFormState] = useState(initialState);
  const { email, password, authCode, username, family_name, given_name } =
    formState;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.profile);
  const router = useRouter();

  console.log(user, uiState);
  useEffect(() => {
    getProfile();
    if (user?.username) {
      setUiState("signedIn");
    }
  }, [user]);

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      dispatch(getProfile(user));
      setUiState("signedIn");
    } catch (err) {
      console.log(err);
      setUiState("signIn");
    }
  };

  const signUp = async () => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, family_name, given_name },
      });
      setUiState("confirmSignUp");
    } catch (err) {
      console.log(err);
    }
  };

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, authCode);
      setUiState("signedIn");
      signIn();
    } catch (err) {
      console.log(err);
    }
  };

  const signIn = async () => {
    try {
      await Auth.signIn(email, password);
      checkUser();
      router.push("/");
      setUiState("signedIn");
    } catch (err) {
      console.log(err);
    }
  };

  const forgotPasswordSubmit = async () => {
    try {
      await Auth.forgotPassword(email);
      setUiState("verifyPW");
    } catch (err) {
      console.log(err);
    }
  };

  const verifyForgotPassword = async () => {
    try {
      await Auth.forgotPasswordSubmit(email, authCode, password);
      setUiState("signIn");
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeHandler = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center">
      {uiState === "signUp" && (
        <SignUp
          onChangeHandler={onChangeHandler}
          setUiState={setUiState}
          signUp={signUp}
        />
      )}

      {uiState === "confirmSignUp" && (
        <ConfirmSignUp
          onChangeHandler={onChangeHandler}
          setUiState={setUiState}
          confirmSignUp={confirmSignUp}
        />
      )}

      {uiState === "signIn" && (
        <SignIn
          onChangeHandler={onChangeHandler}
          setUiState={setUiState}
          signIn={signIn}
        />
      )}

      {uiState === "forgotPW" && (
        <ForgotPasswordSubmit
          onChangeHandler={onChangeHandler}
          setUiState={setUiState}
          forgotPasswordSubmit={forgotPasswordSubmit}
        />
      )}

      {uiState === "verifyPW" && (
        <VerifyForgotPassword
          onChangeHandler={onChangeHandler}
          verifyForgotPassword={verifyForgotPassword}
        />
      )}

      {uiState === "signedIn" && user && (
        <div className="flex flex-col justify-center items-center min-h-screen max-w-7xl">
          <p className="text-xl">Welcome, {user.username}</p>
          <p>
            {user.given_name} {user.family_name}
          </p>
          <p>{user.email}</p>
          <button
            className="text-white w-80 mt-10 bg-pink-400 p-3 rounded"
            onClick={() => {
              setUiState("signIn");
              Auth.signOut();
              dispatch(logOut());
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
