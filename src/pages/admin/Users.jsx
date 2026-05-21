import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "../../api/user";

export default function Users() {

  const { token } = useSelector(
    (state) => state.auth
  );

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const fetchUsers = async () => {
      try {

        const res = await getUsers(token);

        setUsers(res.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();

  }, []);

  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold mb-5">
        Registered Users
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (
              <tr key={user._id}>

                <td className="p-3 border">
                  {user.name}
                </td>

                <td className="p-3 border">
                  {user.email}
                </td>

                <td className="p-3 border">
                  {user.role}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}