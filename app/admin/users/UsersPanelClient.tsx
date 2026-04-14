"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./users.module.css";

type AdminUser = {
  _id: string;
  email: string;
  name: string;
  isActive: boolean;
  isSuperAdmin: boolean;
  createdAt: string;
};

export default function UsersPanelClient({ currentAdminId }: { currentAdminId: string }) {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.admins || []);
      }
    } catch (_err) {
      console.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleActive = async (id: string, currentVal: boolean) => {
    try {
      await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentVal }),
      });
      fetchUsers();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleSuperAdmin = async (id: string, currentVal: boolean) => {
    try {
      await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSuperAdmin: !currentVal }),
      });
      fetchUsers();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin account?")) return;
    try {
      await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.navRow}>
          <h1>Super Admin User Management</h1>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/admin" className={styles.navBtn}>
              &larr; Back to Inventory
            </Link>
          </nav>
        </div>
      </header>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Active Status</th>
                <th>Super Admin Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isMe = u._id === currentAdminId;
                return (
                  <tr key={u._id}>
                    <td>{u.name} {isMe && <strong>(You)</strong>}</td>
                    <td>{u.email}</td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td>
                      <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="checkbox"
                          checked={u.isActive}
                          onChange={() => toggleActive(u._id, u.isActive)}
                          disabled={isMe}
                        />
                        {u.isActive ? "Verified" : "Pending"}
                      </label>
                    </td>
                    <td>
                      <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="checkbox"
                          checked={u.isSuperAdmin}
                          onChange={() => toggleSuperAdmin(u._id, u.isSuperAdmin)}
                          disabled={isMe}
                        />
                        {u.isSuperAdmin ? "Super Admin" : "Standard"}
                      </label>
                    </td>
                    <td>
                      {!isMe && (
                        <button onClick={() => deleteUser(u._id)} style={{ color: 'red', cursor: 'pointer', background: 'transparent', border: '1px solid red', padding: '4px 8px', borderRadius: '4px' }}>
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
