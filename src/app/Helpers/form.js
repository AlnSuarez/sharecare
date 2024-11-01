// formHelpers.js

export const validateFullName = (name) => {
    const nameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
    return nameRegex.test(name.trim());
};

export const validateDateOfBirth = (date) => {
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2]\d|3[0-1])\/\d{4}$/;
    return dateRegex.test(date);
};

export const handleBlurHelper = (field, values, setErrors, setMobileError, setDobError) => {
    const { fullName, mobile, dob } = values;

    if (field === 'fullName') {
        if (!validateFullName(fullName)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: true,
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: false,
            }));
        }
    } else if (field === 'mobile') {
        if (mobile.replace(/\D/g, '').length < 10) {
            setMobileError('Phone number must be at least 10 digits');
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: true,
            }));
        } else {
            setMobileError('');
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: false,
            }));
        }
    } else if (field === 'dob') {
        if (!validateDateOfBirth(dob)) {
            setDobError('Date format must be MM/DD/YYYY');
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: true,
            }));
        } else {
            setDobError('');
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: false,
            }));
        }
    }
};

export const handleInputChangeHelper = (field, event, setFullName, errors, setErrors) => {
    const value = event.target.value;
    if (field === 'fullName') {
        setFullName(value); // Actualizar el valor de fullName
        if (errors.fullName && validateFullName(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                fullName: false,
            }));
        }
    } else if (errors[field]) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: false,
        }));
    }
};
