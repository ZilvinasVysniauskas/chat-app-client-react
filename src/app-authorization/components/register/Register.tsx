import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import './Register.scss';

type FormData = {
    email: string;
    password: string;
    passwordRepeat: string;
    username: string;
};

const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
    passwordRepeat: yup.string().required().test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      }),
    username: yup.string().required(),
});

function RegisterComponent() {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    const onSubmit = (data: FormData) => {
        AuthService.registerUser(data).then((isSuccessful: boolean) => {
            if (isSuccessful) {
                navigate('/');
            } else {
                alert('Registration failed');
            }
        });
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input {...field} type="text" className="form-control" id="username" />}
                    />
                    {errors.username && <p>This field is required</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input {...field} type="email" className="form-control" id="email" />}
                    />
                    {errors.email && <p>This field is required</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input {...field} type="password" className="form-control" id="password" />}
                    />
                    {errors.password && <p>This field is required</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="passwordRepeat">Repeat Password:</label>
                    <Controller
                        name="passwordRepeat"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input {...field} type="password" className="form-control" id="passwordRepeat" />}
                    />
                    {errors.passwordRepeat && <p>Passwords must match</p>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={!isValid}>Register</button>
            </form>
        </div>
    );
}

export default RegisterComponent;
