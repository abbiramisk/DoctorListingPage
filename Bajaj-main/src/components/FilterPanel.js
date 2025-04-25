import React from 'react';
import styles from './FilterPanel.module.css';

function FilterPanel({
    specialties,
    selectedSpecialties,
    onSpecialtyChange,
    consultationType,
    onConsultationTypeChange,
    sortBy,
    onSortByChange,
}) {
    return (
        <div className={styles.container}>
            <div className={styles.filterGroup}>
                <h3 className={styles.filterHeader} data-testid="filter-header-moc">
                    Consultation Mode
                </h3>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="consultationType"
                            value="video"
                            checked={consultationType === 'video'}
                            onChange={onConsultationTypeChange}
                            data-testid="filter-video-consult"
                        />
                        <span className={styles.labelText}>Video Consult</span>
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="consultationType"
                            value="inClinic"
                            checked={consultationType === 'inClinic'}
                            onChange={onConsultationTypeChange}
                            data-testid="filter-in-clinic"
                        />
                        <span className={styles.labelText}>In Clinic</span>
                    </label>
                </div>
            </div>

            <div className={styles.filterGroup}>
                <h3 className={styles.filterHeader} data-testid="filter-header-speciality">
                    Speciality
                </h3>
                <div className={styles.checkboxGroup}>
                    {specialties.map((specialty) => (
                        <label key={specialty} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                value={specialty}
                                checked={selectedSpecialties.has(specialty)}
                                onChange={onSpecialtyChange}
                                data-testid={`filter-specialty-${specialty.replace(/ /g, '-')}`}
                            />
                            <span className={styles.labelText}>{specialty}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.filterGroup}>
                <h3 className={styles.filterHeader} data-testid="filter-header-sort">
                    Sort By
                </h3>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="sortBy"
                            value="fees"
                            checked={sortBy === 'fees'}
                            onChange={onSortByChange}
                            data-testid="sort-fees"
                        />
                        <span className={styles.labelText}>Fees (Low to High)</span>
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="sortBy"
                            value="experience"
                            checked={sortBy === 'experience'}
                            onChange={onSortByChange}
                            data-testid="sort-experience"
                        />
                        <span className={styles.labelText}>Experience (High to Low)</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default FilterPanel;