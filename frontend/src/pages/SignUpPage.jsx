import {
    useState,
    loginIcons,
    FaEye,
    IoMdEyeOff,
    Link,
    useNavigate,
    SummaryApi,
    imageToBase64,
    toast,
    CiCamera, Button
} from "../utils/imports";


export const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePicture: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password === data.confirmPassword) {

            const response = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            
            if (result.success) {
                toast.success(result.message);
                navigate("/login");
            }
            
            if (result.error) {
                toast.error(result.message);
            }
        } else {
            toast.error("Please check password and confirm password");
        }
    };

    const handleUploadPicture = async (e) => {
        const file = e.target.files[0];
        const profilePicture = await imageToBase64(file);
        setData(prev => ({...prev, profilePicture}));
    };


    return (
        <div className="m-10">
            <form
                className="bg-white rounded-sm shadow-sm py-7 px-5 w-full flex flex-col max-w-sm mx-auto gap-2"
                onSubmit={handleSubmit}>
                <label
                    className="relative w-20 h-20 mx-auto rounded-full bg-center bg-cover bg-no-repeat cursor-pointer group"
                    style={{ backgroundImage: `url(${data.profilePicture || loginIcons})` }}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="absolute inset-0 rounded-full bg-black opacity-60"></div>
                        <CiCamera className="relative z-10 text-white" size={36} />
                    </div>
                    <input type="file" className="hidden" onChange={handleUploadPicture} />
                </label>
                <div className="grid">
                    <label htmlFor="name">Name</label>
                    <div className="bg-slate-100 mt-1 p-2 rounded-sm">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            onChange={handleChange}
                            value={data.name}
                            placeholder="Enter name"
                            className="w-full h-full outline-none bg-transparent"
                        />
                    </div>
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
                            value={data.email}
                            placeholder="Enter email"
                            className="w-full h-full outline-none bg-transparent"
                        />
                    </div>
                </div>
                <div className="grid">
                    <label htmlFor="password">Password</label>
                    <div className="bg-slate-100 mt-1 p-2 flex rounded-sm">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            required
                            onChange={handleChange}
                            value={data.password}
                            placeholder="Enter password"
                            className="w-full h-full outline-none bg-transparent"
                        />
                        <div className="cursor-pointer text-xl" onClick={() => setShowPassword(!showPassword)}>
                            <span>
                                {showPassword ? <FaEye /> : <IoMdEyeOff />}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="grid">
                    <label htmlFor="retype-password">Retype Password</label>
                    <div className="bg-slate-100 mt-1 p-2 flex rounded-sm">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            id="retype-password"
                            required
                            onChange={handleChange}
                            value={data.confirmPassword}
                            placeholder="Enter confirm password"
                            className="w-full h-full outline-none bg-transparent"
                        />
                        <div className="cursor-pointer text-xl" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <IoMdEyeOff />}</div>
                    </div>
                </div>
                <div className="grid justify-center p-5">
                    <Button size="lg" shape="rounded" variant="danger">Sign Up</Button>
                </div>
                <div>Already have an account? <Link to="/login" className="text-red-600 hover:text-red-700 hover:underline">Login</Link></div>
            </form>
        </div>
    );
};


export default SignUpPage;
