import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Login.scss';
import UiButton from '../../../common/UI/Button/UiButton';
import AuthService from '../../services/AuthService';
import { LoginRequest } from '../../types';
import { useNavigate } from 'react-router-dom';
import UiInput from '../../../common/UI/Input/UiInput';


const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required()
});

const Login = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginRequest) => {
    const isSuccessful = await AuthService.loginUser(data);
    if (isSuccessful) {
      navigate('/');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

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

        <UiButton
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
          type='submit'
        >Login</UiButton>

        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
