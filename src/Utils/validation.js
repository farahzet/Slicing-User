export const validationForm = ( formData, setError ) => {
    let valid = true;

    const newErrors = {
        // name: "",
        height: "",
        weight: "",
        age:"",
        gender:"",
        job:"",
        condition:"",
    }

    // if (!formData.name){
    //     newErrors.name = '*wajib diisi'
    //     valid=false;
    // }
    if (!formData.height){
        newErrors.height = '*wajib diisi'
        valid=false;
    }
    if (!formData.weight){
        newErrors.weight = '*wajib diisi'
        valid=false;
    }
    if (!formData.age){
        newErrors.age = '*wajib diisi'
        valid=false;
    }
    if (!formData.gender){
        newErrors.gender = '*wajib diisi'
        valid=false;
    }
    if (!formData.job){
        newErrors.job = '*wajib diisi'
        valid=false;
    }
    if (!formData.condition){
        newErrors.condition = '*wajib diisi'
        valid=false;
    }

    setError(newErrors);
    return valid;
}

export const dataCalories = (formData) => {
    const formUser = {
        height: formData.height,
        weight: formData.weight,
        age: formData.age,
        gender: formData.gender,
        activity_name: formData.activity_name,
        calories: formData.calories
    }

    return formUser;
}

export const loginUser = (form) => {
    const formData = {
        email: form.email,
        password: form.password,
    }
    return formData;
};

export const SingIn = (form) => {
    const formData = {
        username: form.username,
        phone: form.phone,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        role: "endUser",
    }
    return formData;
};

export const validateLogin = (form, setError) => {
    let valid = true;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const newErrors = {
        email : '',
        password : '',
    }

    if (!form.email) {
        newErrors.email = 'Email wajib diisi!';
        valid = false;
    }

    if (!form.password) {
        newErrors.password = 'Password wajib diisi!';
        valid = false;
    }

    setError(newErrors);
    return valid;
}