import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Login.scss';
import Button from '../../../common/UI/Button/Button';
import AuthService from '../../services/AuthService';
import { LoginRequest } from '../../types';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required()
});

const Login = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<LoginRequest> = data => {
    AuthService.loginUser(data).then((isSuccessful: boolean) => {
      console.log(isSuccessful);
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-envelope"></i>
              </span>
            </div>
            <input type="email" className="form-control" id="email" {...register('email')} required />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-lock"></i>
              </span>
            </div>
            <input type="password" className="form-control" id="password" {...register('password')} required />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>

        <Button primary onClick={onSubmit} disabled={!isValid} >Login</Button>
        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
