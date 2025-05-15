import { useState } from "react";
import axios from "axios";

export default function AddWingy() {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddWingy = async () => {
    setLoading(true);
    setResponseMessage("");

    const adminUserId = localStorage.getItem("userId");
    if (!adminUserId) {
      setResponseMessage("Admin user ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://w-v2.glitch.me/adminaddwingy", {
        adminuserid: adminUserId,
        username,
        amount,
        password: "AdminWingy121122",
      });

      setResponseMessage(response.data.message || "Wingy added successfully.");
    } catch (error) {
      setResponseMessage(
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
      <h4 className="text-lg font-semibold mb-4">Add Wingy</h4>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter username"
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter amount"
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          onClick={handleAddWingy}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Wingy"}
        </button>
        {responseMessage && (
          <p
            className={`text-sm mt-2 ${responseMessage.includes('successfully') ? 'text-green-500' : 'text-gray-900'}`}
          >
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
}