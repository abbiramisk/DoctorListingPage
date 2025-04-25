// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import styles from './App.module.css';

function App() {
    const [allDoctors, setAllDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialties, setSelectedSpecialties] = useState(new Set());
    const [consultationType, setConsultationType] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [specialtiesList, setSpecialtiesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

    const fetchDoctors = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setAllDoctors(data);
            setFilteredDoctors(data);
            const uniqueSpecialties = new Set();
            data.forEach(doctor => {
                if (Array.isArray(doctor.speciality)) {
                    doctor.speciality.forEach(spec => uniqueSpecialties.add(spec));
                } else if (doctor.speciality) {
                    uniqueSpecialties.add(doctor.speciality);
                }
            });
            setSpecialtiesList([...uniqueSpecialties].sort());
            applyFiltersFromURL(data);
        } catch (e) {
            setError(e.message);
            setFilteredDoctors([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDoctors();
    }, [fetchDoctors]);

    useEffect(() => {
        filterDoctors();
        updateURL();
    }, [searchTerm, selectedSpecialties, consultationType, sortBy, allDoctors]);

    const filterDoctors = useCallback(() => {
        if (loading || error) return;

        let doctors = [...allDoctors];

        if (searchTerm) {
            doctors = doctors.filter(doctor =>
                doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (consultationType) {
            doctors = doctors.filter(
                doctor => doctor.consultation_type.toLowerCase() === consultationType.toLowerCase()
            );
        }

        if (selectedSpecialties.size > 0) {
            doctors = doctors.filter(doctor => {
                if (Array.isArray(doctor.speciality)) {
                    return doctor.speciality.some(spec => selectedSpecialties.has(spec));
                } else if (doctor.speciality) {
                    return selectedSpecialties.has(doctor.speciality);
                }
                return false;
            });
        }

        if (sortBy === 'fees') {
            doctors.sort((a, b) => a.fees - b.fees);
        } else if (sortBy === 'experience') {
            doctors.sort((a, b) => b.experience - a.experience);
        }

        setFilteredDoctors(doctors);
    }, [allDoctors, searchTerm, selectedSpecialties, consultationType, sortBy, loading, error]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleSpecialtyChange = (event) => {
        const specialty = event.target.value;
        const isChecked = event.target.checked;
        setSelectedSpecialties(prev => {
            const next = new Set(prev);
            if (isChecked) {
                next.add(specialty);
            } else {
                next.delete(specialty);
            }
            return next;
        });
    };

    const handleConsultationTypeChange = (event) => {
        setConsultationType(event.target.value);
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    const updateURL = useCallback(() => {
        const params = new URLSearchParams();
        if (searchTerm) {
            params.set('name', searchTerm);
        }
        if (consultationType) {
            params.set('consultationType', consultationType);
        }
        if (selectedSpecialties.size > 0) {
            params.set('specialities', Array.from(selectedSpecialties).join(','));
        }
        if (sortBy) {
            params.set('sortBy', sortBy);
        }
        const newURL = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, '', newURL);
    }, [searchTerm, consultationType, selectedSpecialties, sortBy]);

    const applyFiltersFromURL = useCallback((doctors) => {
        const params = new URLSearchParams(window.location.search);
        const name = params.get('name') || '';
        const consultationTypeParam = params.get('consultationType') || '';
        const specialitiesParam = params.get('specialities') || '';
        const sortByParam = params.get('sortBy') || '';

        setSearchTerm(name);
        setConsultationType(consultationTypeParam);
        if (specialitiesParam) {
            setSelectedSpecialties(new Set(specialitiesParam.split(',')));
        }
        setSortBy(sortByParam);
    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading doctors...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error loading doctors: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Doctor Listing</h1>
            <SearchBar onSearch={handleSearch} allDoctors={allDoctors} setSuggestions={(suggestions) => {
                const filtered = allDoctors
                    .filter(doctor => doctor.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .slice(0, 3);
                setSuggestions(filtered);
            }} />
            <FilterPanel
                specialties={specialtiesList}
                selectedSpecialties={selectedSpecialties}
                onSpecialtyChange={handleSpecialtyChange}
                consultationType={consultationType}
                onConsultationTypeChange={handleConsultationTypeChange}
                sortBy={sortBy}
                onSortByChange={handleSortByChange}
            />
            <DoctorList doctors={filteredDoctors} />
        </div>
    );
}

export default App;