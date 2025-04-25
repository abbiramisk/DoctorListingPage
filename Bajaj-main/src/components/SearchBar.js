import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm);
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                className={styles.input}
                placeholder="Search by doctor name..."
                value={searchTerm}
                onChange={handleInputChange}
                data-testid="autocomplete-input"
            />
            {suggestions.length > 0 && (
                <ul className={styles.suggestions}>
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className={styles.suggestionItem}
                            data-testid="suggestion-item"
                            onClick={() => {
                                setSearchTerm(suggestion.name);
                                onSearch(suggestion.name);
                                setSuggestions([]);
                            }}
                        >
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;