// // src/app/dashboard/page.tsx
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
// import { redirect } from 'next/navigation';

// export default async function Dashboard() {
//   const session = await getServerSession(authOptions);
//   if (!session) redirect('/login');

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch users', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-2 bg-white shadow rounded">
            <p><strong>{user.name}</strong></p>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
