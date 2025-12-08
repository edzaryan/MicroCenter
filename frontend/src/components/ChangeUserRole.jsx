import {
    useState,
    IoMdClose,
    SummaryApi,
    toast,
    role as allRoles, Button
} from "../utils/imports";


export const ChangeUserRole = ({ userId, name, email, role, onClose, callFunc }) => {
    const [userRole, setUserRole] = useState(role);

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId,
                role: userRole
            })
        });

        const responseData = await fetchResponse.json();

        if (responseData.success) {
            toast.success("User role updated successfully");
            onClose();
            callFunc();
        } else {
            toast.error(responseData.message);
        }
    };

    return (
        <div 
            onClick={onClose} 
            className="fixed inset-2 w-full h-full z-10 grid justify-center items-center bg-slate-200 bg-opacity-50">
            <div
                onClick={e => e.stopPropagation()}
                className="w-[500px] bg-white shadow-md p-6 max-w-sm">
                <button className="block ml-auto" onClick={onClose}>
                    <IoMdClose />
                </button>
                <div className="pb-4 text-lg font-medium">Change User Role</div>
                <div className="pb-2">Name: {name}</div>
                <div className="pb-2">Email: {email}</div>
                <div className="flex items-center justify-between pb-5">
                    <div>Role</div>
                    <select className="border px-3 py-1" value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                        {Object.values(allRoles).map(el => <option key={el} value={el}>{el}</option>)}
                    </select>
                </div>
                <div className="grid justify-center">
                    <Button variant="danger" shape="rounded" size="md" onClick={updateUserRole}>Change Role</Button>
                </div>
            </div>
        </div>
    );
};


export default ChangeUserRole;
