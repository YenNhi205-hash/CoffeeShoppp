// UpdateBuyerForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateBuyerForm({ buyerId, onUpdateSuccess }) {
  const [buyer, setBuyer] = useState({ name: "", email: "", phoneNum: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
  console.log("Buyer ID received:", buyerId);
  if (buyerId) {
    fetch(`http://localhost:7055/api/buyer/${buyerId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          setBuyer({ 
            name: data.data.name, 
            email: data.data.email, 
            phoneNum: data.data.phoneNum 
          });
        } else {
          console.error("Invalid response data", data);
        }
      })
      .catch((err) => console.error("Lỗi lấy người mua:", err));
  }
}, [buyerId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buyerId) {
      setError("ID buyer không hợp lệ");
      return;
    }
    try {
      await axios.put(`https://localhost:7055/api/buyer/${buyerId}`, buyer);
      alert("Cập nhật thành công!");
      onUpdateSuccess();
    } catch (error) {
      console.error("Lỗi cập nhật buyer:", error);
      setError("Cập nhật thất bại! Hãy thử lại.");
    }
  };

  return (
    <div>
      <h2>Cập nhật người mua</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Tên:
          <input
            type="text"
            value={buyer.name}
            onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={buyer.email}
            onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
            required
          />
        </label>
        <label>
          Số điện thoại:
          <input
            type="text"
            value={buyer.phoneNum}
            onChange={(e) => setBuyer({ ...buyer, phoneNum: e.target.value })}
            required
          />
        </label>
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
}

export default UpdateBuyerForm;
