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
    <div className="p-5 bg-gray-50 dark:bg-gray-950 min-h-screen transition-all duration-300">

      <h1 className="text-2xl font-bold mb-5 text-black dark:text-white">
  Registered Users
</h1>

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-200 dark:border-gray-800">

         <thead className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white">

            <tr>
             <th className="p-3 border border-gray-300 dark:border-gray-700">
  Name
</th>

<th className="p-3 border border-gray-300 dark:border-gray-700">
  Email
</th>

<th className="p-3 border border-gray-300 dark:border-gray-700">
  Role
</th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">

               <td className="p-3 border border-gray-200 dark:border-gray-800 text-black dark:text-white">
  {user.name}
</td>

<td className="p-3 border border-gray-200 dark:border-gray-800 text-black dark:text-white">
  {user.email}
</td>

<td className="p-3 border border-gray-200 dark:border-gray-800 text-black dark:text-white">
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