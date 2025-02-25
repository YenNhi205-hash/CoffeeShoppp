import React, { useState } from "react";
import axios from "axios";

function AddBuyer() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5193/api/buyer", {
                name,
                email,
                phoneNum
            });
            alert("Buyer created successfully!");
        } catch (error) {
            alert("Error creating buyer");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="text" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} placeholder="Phone Number" required />
            <button type="submit">Create Buyer</button>
        </form>
    );
}

export default AddBuyer;
