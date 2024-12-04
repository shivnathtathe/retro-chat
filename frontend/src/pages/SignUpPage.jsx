import { useState } from "react";
import { useAuthStore } from "../zustandStore/useAuthStore.js";
import { EyeOff,Eye,Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import CommunityBannerImage from "../components/CommunityBannerImage.jsx";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signUp, isSigningUp } = useAuthStore();

  const validateFormInput = () => {

    if(!formData.fullName.trim() ) return toast.error("Full name is required!");
    if(!formData.email.trim() ) return toast.error("Email is required!");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format provided!");
    if(!formData.password.trim() ) return toast.error("Password is required!");
    if(formData.password.length < 6 ) return toast.error("Password must be at least 6 characters!");
    return true;

  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const success = validateFormInput();
    if(success === true){
        signUp(formData);
    }
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="left-side-div flex flex-col justify-center items-center p-6 sm:p-12 ">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group ">
              <div
                className="size-12 rounded-lx bg-primary/10 flex items-center justify-center group-hover:bg-primary/20*
                            transition-colors"
              ></div>
              <h1 className="text-2xl font-bold mt-2">Create account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Input form */}
          {/* <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
                    </svg>
                    </label> */}
          {/* <span className="label-text font-medium">Full Name</span> */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
            type="text"
            className="grow"
            placeholder="Email"
            value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>

          <label className="relative input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
            type={showPassword ?"text":"password"}
            className="grow"
            placeholder="password"
            value={formData.password}   
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={()=>setShowPassword(!showPassword)}
            >
                {
                showPassword ?
                (<EyeOff className="size-5 text-base-content/40"/>)
                :
                (<Eye className="size-5 text-base-content/40"/>)
                }

            </button>
          </label>
          <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSigningUp}
          >
            {isSigningUp?(
                <>
                <Loader2 className="size-5 automate-spin"/>
                Loading...
                </>
            ):(
                "Create account"
            )}
          </button>
          </form>

          <div className="text-center">
            <p className="text-base-center/60">
            Already have account?{" "}
            <Link to="/login" className="link link-primary">
            Sign in
            </Link>
            </p>
            
          </div>
        </div>
      </div>

      <CommunityBannerImage
      title="Currently on signup page"
      description="Currently on signup page"
      />
    </div>
  );
};

export default SignUpPage;
