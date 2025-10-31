import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        window.location.href = "/login";
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-blue-700 text-white p-4">
        <h2 className="text-2xl font-bold mb-8">Life Earn</h2>
        <ul>
          <li className="mb-4 hover:text-gray-300 cursor-pointer">🏠 Dashboard</li>
          <li className="mb-4 hover:text-gray-300 cursor-pointer">💰 Earnings</li>
          <li className="mb-4 hover:text-gray-300 cursor-pointer">📊 Stats</li>
          <li className="mb-4 hover:text-gray-300 cursor-pointer">⚙️ Settings</li>
        </ul>
        <button
          onClick={handleLogout}
          className="mt-8 bg-red-500 text-white w-full py-2 rounded"
        >
          Log Out
        </button>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.email}</h1>
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Total Earnings</h2>
          <p className="text-3xl font-bold text-green-600">₦0.00</p>
          <p className="text-gray-500 mt-2">Start earning to see your balance grow!</p>
        </div>
      </div>
    </div>
  );
                                           }
