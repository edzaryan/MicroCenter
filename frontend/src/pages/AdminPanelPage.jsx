import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../context/userContext";
import role from "../common/role";

const AdminPanelPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.role !== role.ADMIN) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-[calc(100vh-120px)] md:flex hidden">
            <aside className="bg-white min-h-full w-full max-w-60 customShadow">
                <div className="h-32 flex justify-center items-center flex-col">
                    <div className="text-5xl cursor-pointer relative flex justify-center">
                        {
                            user?.profilePicture ? (
                                <img src={user?.profilePicture} className="w-20 h-20 rounded-full" alt={user?.name} />
                            ) : (
                                <FaRegCircleUser />
                            )
                        }
                    </div>
                    <p className="capitalize text-lg font-semibold">{user?.name}</p>
                    <p className="text-sm">{user?.role}</p>
                </div>
                <div>
                    <nav className="grid p-4">
                        <Link to="all-users" className="px-2 py-1 hover:bg-slate-100">All Users</Link>
                        <Link to="all-products" className="px-2 py-1 hover:bg-slate-100">All Products</Link>
                    </nav>
                </div>
            </aside>

            <main className="w-full h-full p-2">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminPanelPage;
