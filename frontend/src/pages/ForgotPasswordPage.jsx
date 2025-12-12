import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Button from "../components/Button";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import lock from "../assets/icons/lock.png";
import resetPasswordIcons from "../assets/icons/forgotPassword.gif";

const ForgotPasswordPage = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "code") setCode(value);
        if (name === "newPassword") setNewPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    const handleSubmitEmail = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(SummaryApi.forgotPassword.url, {
                method: SummaryApi.forgotPassword.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(result.message);
                setStep(2);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
        }
    };

    const handleSubmitCode = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(SummaryApi.checkVerificationCode.url, {
                method: SummaryApi.checkVerificationCode.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(result.message);
                setStep(3);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
        }
    };

    const handleSubmitNewPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(SummaryApi.changePassword.url, {
                method: SummaryApi.changePassword.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ newPassword }),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(result.message);
                navigate("/login");
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="m-10">
            {step === 1 && (
                <form
                    className="bg-white rounded-sm shadow-sm py-7 px-5 w-full flex flex-col max-w-sm mx-auto gap-2"
                    onSubmit={handleSubmitEmail}
                >
                    <div className="w-20 h-20 mx-auto rounded-full">
                        <img className="rounded-full" src={lock} alt="login icons" />
                    </div>
                    <div className="my-3 text-center">
                        <div className="text-lg font-medium my-1">Forgotten your password?</div>
                        <div>Don't worry, we'll send you a message to help you reset your password.</div>
                    </div>
                    <div className="grid">
                        <label htmlFor="email">Email</label>
                        <div className="bg-slate-100 mt-1 p-2 rounded-sm">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                onChange={handleChange}
                                value={email}
                                placeholder="Enter email"
                                className="w-full h-full outline-none bg-transparent"
                            />
                        </div>
                    </div>
                    <div className="grid justify-center p-5">
                        <Button size="lg" shape="rounded" variant="danger">Send</Button>
                    </div>
                    <div>Don't have an account? <Link to="/signup" className="text-red-600 hover:text-red-700 hover:underline">Sign up</Link></div>
                </form>
            )}
            {step === 2 && (
                <form
                    className="bg-white rounded-sm shadow-sm py-7 px-5 w-full flex flex-col max-w-sm mx-auto gap-2"
                    onSubmit={handleSubmitCode}
                >
                    <div className="w-20 h-20 mx-auto rounded-full">
                        <img className="rounded-full" src={resetPasswordIcons} alt="login icons" />
                    </div>
                    <div className="my-3 text-center">
                        <div className="text-lg font-medium my-1">Let us know it’s you</div>
                        <div>Last step! To secure your account, enter the code we just sent to {email}</div>
                    </div>
                    <div className="grid">
                        <label htmlFor="code">Code</label>
                        <div className="bg-slate-100 mt-1 p-2 rounded-sm">
                            <input
                                type="text"
                                name="code"
                                id="code"
                                required
                                onChange={handleChange}
                                value={code}
                                placeholder="Enter code"
                                className="w-full h-full outline-none bg-transparent"
                            />
                        </div>
                    </div>
                    <div className="grid justify-center p-5">
                        <Button size="lg" shape="rounded" variant="danger">Submit</Button>
                    </div>
                </form>
            )}
            {step === 3 && (
                <form
                    className="bg-white rounded-sm shadow-sm py-7 px-5 w-full flex flex-col max-w-sm mx-auto gap-2"
                    onSubmit={handleSubmitNewPassword}
                >
                    <div className="w-20 h-20 mx-auto rounded-full">
                        <img className="rounded-full" src={lock} alt="login icons" />
                    </div>
                    <div className="my-3 text-center">
                        <div className="text-lg font-medium my-1">Reset your password</div>
                        <div>Please set a new password for your account.</div>
                    </div>
                    <div className="grid">
                        <label htmlFor="newPassword">New Password</label>
                        <div className="bg-slate-100 mt-1 p-2 flex rounded-sm">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                id="newPassword"
                                required
                                onChange={handleChange}
                                value={newPassword}
                                placeholder="Enter new password"
                                className="w-full h-full outline-none bg-transparent"
                            />
                            <div
                                className="cursor-pointer text-xl"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEye /> : <IoMdEyeOff />}
                            </div>
                        </div>
                    </div>
                    <div className="grid">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <div className="bg-slate-100 mt-1 p-2 flex rounded-sm">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                required
                                onChange={handleChange}
                                value={confirmPassword}
                                placeholder="Confirm new password"
                                className="w-full h-full outline-none bg-transparent"
                            />
                            <div
                                className="cursor-pointer text-xl"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEye /> : <IoMdEyeOff />}
                            </div>
                        </div>
                    </div>
                    <div className="grid justify-center p-5">
                        <Button size="lg" shape="rounded" variant="danger">
                            Reset Password
                        </Button>
                    </div>
                </form>
            )}
            {step === 4 && (
                <div className="bg-white rounded-sm shadow-sm py-7 px-5 w-full flex flex-col max-w-sm mx-auto gap-2 text-center">
                    <p className="text-green-600">Your password has been successfully reset!</p>
                    <Link to="/login" className="text-red-600 hover:text-red-700 hover:underline">Go to Login</Link>
                </div>
            )}
        </div>
    );
};

export default ForgotPasswordPage;
