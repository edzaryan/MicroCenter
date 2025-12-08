import {
  useEffect,
  useState,
  SummaryApi ,
  toast,
  moment,
  MdModeEdit,
  ChangeUserRole
} from "../utils/imports";


const AllUsersPage = () => {
  // const [allUsers, setAllUsers] = useState([]);
  // const [openUpdateRole, setOpenUpdateRole] = useState(false);
  // const [updateUserDetails, setUpdateUserDetails] = useState({
  //   _id: "",
  //   email: "",
  //   name: "",
  //   role: ""
  // });

  // useEffect(() => {
  //   fetchAllUsers();
  // }, []);

  // const fetchAllUsers = async () => {
  //   const fetchData = await fetch(SummaryApi.allUser.url, {
  //     method: SummaryApi.allUser.method,
  //     credentials: "include"
  //   });

  //   const dataResponse = await fetchData.json();

  //   if (dataResponse.success) {
  //     setAllUsers(dataResponse.data);
  //   }

  //   if (dataResponse.error) {
  //     toast.error(dataResponse.message);
  //   }
  // };

  return (
    <div className="grid gap-3">
      {/* <div className="bg-white py-2 px-4 flex justify-start items-center">
        <h2 className="font-bold text-lg">All Users</h2>
      </div>
      <div className="bg-white">
        <table className="w-full userTable">
          <thead>
          <tr className="bg-black text-white">
            <th className="p-2">Sr.</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Created Date</th>
            <th className="p-2">Action</th>
          </tr>
          </thead>
          <tbody>
          {
            allUsers.map((user, index) => (
                <tr key={user._id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{user?.name}</td>
                  <td className="p-2">{user?.email}</td>
                  <td className="p-2">{user?.role}</td>
                  <td className="p-2">{moment(user?.createdAt).format("LL")}</td>
                  <td className="p-2">
                    <button
                        className="bg-red-600 p-2 rounded-full cursor-pointer hover:bg-red-700 text-white"
                        onClick={() => {
                          setUpdateUserDetails(user);
                          setOpenUpdateRole(true);
                        }}>
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
            ))
          }
          </tbody>
        </table>
        {
            openUpdateRole && (
                <ChangeUserRole
                    {...updateUserDetails}
                    onClose={() => setOpenUpdateRole(false)}
                    callFunc={fetchAllUsers}
                />
            )
        }
      </div> */}
    </div>
  );
};


export default AllUsersPage;
