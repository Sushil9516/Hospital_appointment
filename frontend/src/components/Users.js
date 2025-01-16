import React, { useEffect, useState } from "react";
const Users = () => {
  const [users, setusers] = useState([]);

  useEffect(() => {
    getusers();
  }, []);

  const getusers = async () => {
    let result = await fetch("http://localhost:4000/users", {});
    result = await result.json();
    setusers(result);
  };

  return (
    <div className="product-list">
      <h3>Users List</h3>

      {users.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No result found</h1>
      )}
    </div>
  );
};
export default Users;
