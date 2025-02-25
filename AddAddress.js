import React, { useState } from "react";
import axios from "axios";

function AddAddress({ buyerId }) {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const addressData = {
            street,
            city,
            state,
            country,
        };

        try {
            // Gửi POST request để tạo địa chỉ cho buyer
            const response = await axios.post(
                `https://localhost:7055/api/buyer/${buyerId}/address`,
                addressData
            );

            if (response.status === 201) {
                setSuccessMessage("Địa chỉ đã được thêm thành công!");
                setError("");
                // Xóa form sau khi thêm thành công
                setStreet("");
                setCity("");
                setState("");
                setCountry("");
            }
        } catch (err) {
            setError("Không thể thêm địa chỉ. Vui lòng thử lại.");
            setSuccessMessage("");
        }
    };

    return (
        <div>
            <h3>Thêm Địa Chỉ Cho Người Mua</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Đường</label>
                    <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Thành phố</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Tỉnh</label>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Đất nước</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Thêm Địa Chỉ</button>
            </form>
        </div>
    );
}

export default AddAddress;
