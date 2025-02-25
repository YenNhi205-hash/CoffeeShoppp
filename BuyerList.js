import React, { useEffect, useState } from "react";
import axios from "axios";

function BuyerList({ onBuyerSelect, onAddAddressClick }) { // Thêm prop onAddAddressClick
    const [buyers, setBuyers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("https://localhost:7055/api/buyer")  // Lấy danh sách buyers
            .then(response => {
                setBuyers(response.data.data);
            })
            .catch(err => {
                setError("Failed to fetch buyers");
            });
    }, []);

    return (
        <div>
            <h1>Buyers</h1>
            {error && <p>{error}</p>}
            <ul>
                {buyers.map((buyer) => (
                    <li key={buyer.buyerId}>
                        {buyer.name} - {buyer.email} - {buyer.phoneNum}
                        {/* Nút Thêm Địa Chỉ bên cạnh mỗi buyer */}
                        <button onClick={() => onBuyerSelect(buyer.buyerId)}>Cập nhật</button>
                        <button onClick={() => onAddAddressClick(buyer.buyerId)}>
                            Thêm Địa Chỉ
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BuyerList;
