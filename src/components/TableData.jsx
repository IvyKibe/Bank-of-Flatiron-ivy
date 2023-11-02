import  { useEffect, useState } from 'react';
import './TableData.css';
import SearchBar from './SearchBar'; // Import the SearchBar component

function TableData() {
    const [fetchedData, setFetchedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3000/transactions')
            .then((response) => response.json())
            .then((data) => {
                setFetchedData(data);
                setFilteredData(data); // Initialize filteredData with all data
            });
    }, []);

    const handleDelete = (id) => {
        // Send a request to delete the transaction with the given ID
        fetch(`http://localhost:3000/transactions/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    // If the deletion was successful, update the data in the state
                    setFetchedData((prevData) => prevData.filter((transaction) => transaction.id !== id));
                    setFilteredData((prevData) => prevData.filter((transaction) => transaction.id !== id));
                } else {
                    console.error('Failed to delete the transaction');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleSearch = (searchQuery) => {
        // Filter the data based on the search query
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filteredResults = fetchedData.filter((transaction) =>
            transaction.description.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredData(filteredResults);
    };

    return (
        <div>
            <SearchBar searchBar="" onSearch={handleSearch} /> {/* Pass the onSearch function */}
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.amount}</td>
                            <td>
                                <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableData;
