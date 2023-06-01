import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import './Register.scss';
import UiInput from '../../../common/UI/Input/UiInput';
import UiButton from '../../../common/UI/Button/UiButton';

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
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
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

            <form onSubmit={handleSubmit(onSubmit)}>
                <UiInput
                    type='username'
                    register={register('username')}
                    errorMessage={errors.username?.message}
                />
                <UiInput
                    type='email'
                    register={register('email')}
                    errorMessage={errors.email?.message}
                />
                <UiInput
                    type='password'
                    register={register('password')}
                    errorMessage={errors.password?.message}
                />
                <UiInput
                    type='password'
                    register={register('passwordRepeat')}
                    errorMessage={errors.passwordRepeat?.message}
                />
                <UiButton
                    onClick={handleSubmit(onSubmit)}
                    disabled={!isValid}
                    type='submit'
                >Register</UiButton>

            </form>
        </div>
    );
}

export default RegisterComponent;
