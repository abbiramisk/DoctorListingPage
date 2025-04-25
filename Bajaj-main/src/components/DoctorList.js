import React from 'react';
import DoctorCard from './DoctorCard';
import styles from './DoctorList.module.css';

function DoctorList({ doctors }) {
    return (
        <div className={styles.listContainer}>
            {doctors.length > 0 ? (
                doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))
            ) : (
                <p>No doctors found matching your criteria.</p>
            )}
        </div>
    );
}

export default DoctorList;