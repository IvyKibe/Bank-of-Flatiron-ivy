import './Form.css';
import { useState } from 'react';

function FormData() {
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: '',
    });

    const handleSubmit = async () => {
       

        try {
            const response = await fetch('http://localhost:3000/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle a successful POST request here
                console.log('Data successfully added');
            } else {
                // Handle an unsuccessful request here
                console.error('Failed to add data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div>
            <h2>Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                </div>
                <div>
                   <select name="category" value={formData.category} onChange={handleChange} >
                    <option>Category</option>
                    <option>Income</option>
                    <option>Entertainment</option>
                    <option>Fashion</option>
                    <option>food</option>
                    <option>Gift</option>
                    <option>Transportation</option>
                    <option>Housing</option>
                    <option>Entertainment</option>
                   </select>
                   
                </div>
                <div>
                <label htmlFor="Date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        />
                </div>
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
}

export default FormData;