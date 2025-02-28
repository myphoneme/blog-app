import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaEnvelope } from "react-icons/fa";

const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
  >
    <path
      fill="#4285F4"
      d="M44.5 20H24v8.5h11.7C34.3 34 30 38 24 38c-7.7 0-14-6.3-14-14s6.3-14 14-14c3.5 0 6.6 1.3 9 3.4l6-6C34.4 3.5 29.5 1 24 1 11.3 1 1 11.3 1 24s10.3 23 23 23c11.5 0 21-8.3 21-21 0-1.3-.1-2.7-.5-4z"
    />
    <path
      fill="#34A853"
      d="M6.3 14.7l6.6 4.8C15.3 16.7 19.4 14 24 14c3.5 0 6.6 1.3 9 3.4l6-6C34.4 7.5 29.5 5 24 5 15.4 5 8.1 10.1 6.3 14.7z"
    />
    <path
      fill="#FBBC05"
      d="M24 43c6.1 0 11.6-2.1 15.8-5.6l-7.3-5.7c-2.3 1.6-5.2 2.6-8.5 2.6-5.4 0-10.1-3.5-11.8-8.4l-6.8 5.2C9.1 38.1 16 43 24 43z"
    />
    <path
      fill="#EA4335"
      d="M43 24c0-1.3-.1-2.7-.5-4H24v8.5h11.7C34.3 34 30 38 24 38c-7.7 0-14-6.3-14-14 0-2.4.6-4.6 1.7-6.6l-6.8-5.2C2.6 16 1 19.8 1 24c0 12.7 10.3 23 23 23 11.5 0 21-8.3 21-21z"
    />
  </svg>
);

const SignInModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-center text-2xl font-semibold mb-6">
          Join Phoneme
        </h2>

        {/* Signup Options */}
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => {
              console.log("Google signup clicked");
              navigate("/articles");
            }}
            className="flex items-center justify-start gap-x-3 w-full border border-gray-300 py-2 px-4 rounded-full font-medium cursor-pointer"
          >
            <GoogleIcon /> <span>Sign up with Google</span>
          </button>

          <button
            onClick={() => console.log("Facebook signup clicked")}
            className="flex items-center justify-start gap-x-3 w-full border border-gray-300 py-2 px-4 rounded-full font-medium cursor-pointer"
          >
            <FaFacebook className="text-blue-600 w-5 h-5" />
            <span>Sign up with Facebook</span>
          </button>
          <button
            onClick={() => console.log("Email signup clicked")}
            className="flex items-center justify-start gap-x-3 w-full border border-gray-300 py-2 px-4 rounded-full font-medium cursor-pointer"
          >
            <FaEnvelope className="text-gray-500 w-5 h-5" />
            <span>Sign up with Email</span>
          </button>
        </div>

        {/* Sign In Link */}
        <p className="text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <span className="text-green-600 cursor-pointer">Sign in</span>
        </p>

        {/* Terms and Privacy */}
        <p className="text-xs text-center text-gray-400 mt-4">
          Click "Sign up" to agree to Medium's{" "}
          <span className="underline">Terms of Service</span> and acknowledge
          that Medium's <span className="underline">Privacy Policy</span>{" "}
          applies to you.
        </p>
      </motion.div>
    </div>
  );
};

export default SignInModal;
