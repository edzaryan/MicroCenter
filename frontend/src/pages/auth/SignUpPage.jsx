import { Link, useNavigate } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import SummaryApi from "../../common";
import { useState } from "react";

export const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            toast.error("Please check password and confirm password");
            return;
        }

        const response = await fetch(SummaryApi.signUp.url, {
            method: SummaryApi.signUp.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password
            })
        });

        const result = await response.json();

        if (result.success) {
            toast.success(result.message);
            navigate("/login");
        } else {
            toast.error(result.message || "Signup failed");
        }
    };

    const inputClass =
        "w-full mt-1 bg-slate-100 p-2 rounded-sm outline-none focus:outline-none transition";

    return (
        <div className="m-10">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-sm shadow-sm py-7 px-5 w-full flex flex-col max-w-sm mx-auto gap-3"
            >
                {/* Title */}
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-semibold">Create an account</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        It only takes a minute
                    </p>
                </div>

                {/* Name */}
                <div className="grid">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        onChange={handleChange}
                        value={data.name}
                        placeholder="Enter name"
                        className={inputClass}
                    />
                </div>

                {/* Email */}
                <div className="grid">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        onChange={handleChange}
                        value={data.email}
                        placeholder="Enter email"
                        className={inputClass}
                    />
                </div>

                {/* Password */}
                <div className="grid">
                    <label htmlFor="password">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            required
                            onChange={handleChange}
                            value={data.password}
                            placeholder="Enter password"
                            className={`${inputClass} pr-10`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 inset-y-0 flex items-center text-xl text-gray-500 hover:text-gray-800 transition"
                        >
                            {showPassword ? <FaEye /> : <IoMdEyeOff />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="grid">
                    <label htmlFor="confirmPassword">Retype Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                            onChange={handleChange}
                            value={data.confirmPassword}
                            placeholder="Enter confirm password"
                            className={`${inputClass} pr-10`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 inset-y-0 flex items-center text-xl text-gray-500 hover:text-gray-800 transition"
                        >
                            {showPassword ? <FaEye /> : <IoMdEyeOff />}
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <div className="py-4">
                    <Button shape="rounded" variant="danger" block>
                        Sign Up
                    </Button>
                </div>

                {/* Footer */}
                <div className="text-sm text-center">
                    Already have an account?{" "}
                    <Link
                        to="/signin"
                        className="text-red-600 hover:text-red-700 hover:underline"
                    >
                        Sign in
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;
