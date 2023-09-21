import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/Auth1";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [auth] = useAuth();

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/auth/all-users`);
      const { data } = response;

      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      fetchAllUsers();
    }
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-primary">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td>{new Date(user.createdAt).toLocaleString()}</td>
                      <td>{new Date(user.updatedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
