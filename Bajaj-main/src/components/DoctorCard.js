import React from 'react';
import styles from './DoctorCard.module.css';

function DoctorCard({ doctor }) {
    return (
        <div className={styles.card} data-testid="doctor-card">
            <h3 className={styles.name} data-testid="doctor-name">{doctor.name}</h3>
            <p className={styles.specialty} data-testid="doctor-specialty">
                {Array.isArray(doctor.speciality) ? doctor.speciality.join(', ') : doctor.speciality}
            </p>
            <p className={styles.experience} data-testid="doctor-experience">
                {doctor.experience} years experience
            </p>
            <p className={styles.fee} data-testid="doctor-fee">
                ₹{doctor.fees}
            </p>
        </div>
    );
}

export default DoctorCard;