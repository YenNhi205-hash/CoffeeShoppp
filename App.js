import React, { useState } from "react";
import BuyerList from "./components/BuyerList";
import AddBuyer from "./components/AddBuyer";
import AddAddress from "./components/AddAddress";
import UpdateBuyerForm from "./components/UpdateBuyerForm";

function App() {
  const [selectedBuyerId, setSelectedBuyerId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // Trạng thái hiển thị form cập nhật

  const handleBuyerSelection = (buyerId) => {
    setSelectedBuyerId(buyerId);
    setIsUpdating(true); // Hiển thị form cập nhật
  };

  const handleAddAddressClick = (buyerId) => {
    setSelectedBuyerId(buyerId);
  };

  const handleUpdateSuccess = () => {
    setIsUpdating(false); // Ẩn form sau khi cập nhật thành công
  };

  return (
    <div>
      <h1>Coffee Shop Buyers</h1>
      <AddBuyer />
      <BuyerList onBuyerSelect={handleBuyerSelection} onAddAddressClick={handleAddAddressClick} />

      {selectedBuyerId && <AddAddress buyerId={selectedBuyerId} />}
      {isUpdating && <UpdateBuyerForm buyerId={selectedBuyerId} onUpdateSuccess={handleUpdateSuccess} />}
    </div>
  );
}

export default App;
