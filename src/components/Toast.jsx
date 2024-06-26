import Close from "./Close";
import Success from "./Success";

const Toast = ({ text }) => {
  return (
    <div
      id="toast-success"
      className="fixed top-24 right-4 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow "
      role="alert"
    >
      <Success />
      <div className="ms-3 text-sm font-normal">{text}</div>
      <Close />
    </div>
  );
};

export default Toast;
