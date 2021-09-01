import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { clearNotification } from "../../store/actions/blogAction";

const NotificationWrapper = ({ open, setOpen, title, message }) => {
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(3);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (open && seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (open && seconds === 0) {
        dispatch(clearNotification());
        setOpen(false);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  const color = () => {
    switch (title) {
      case "Notification":
        return "border-green-500 text-green-500";
      case "Warning":
        return "border-yellow-300 text-yellow-300";
      case "Danger":
        return "border-red-600 text-red-600";
    }
  };
  return (
    <>
      <div
        aria-live="assertive"
        className="w-full px-4 sm:w-96 fixed top-16 right-1/2 transform translate-x-1/2 max-w-7xl sm:translate-x-0 sm:top-16 sm:right-10 z-20 flex items-center justify-center"
      >
        <Transition
          show={open}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`flex justify-between items-center gap-2 p-2 w-full bg-white shadow-2xl h-14 rounded-lg border-2 overflow-hidden ${color()}`}
          >
            <div className="flex flex-1 flex-col ">
              <div className="flex justify-between items-center">
                <p className="text-sm">{title}</p>
                <p className="text-xs text-dark">
                  disappear in {seconds} sec...
                </p>
              </div>
              <p className="text-sm text-dark">{message}</p>
            </div>
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-7 w-7 p-0.5 border-2 rounded-full cursor-pointer hover:border-gray-200 hover:text-gray-200 ${color()}`}
                onClick={() => {
                  setOpen(false);
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
};

export default NotificationWrapper;
