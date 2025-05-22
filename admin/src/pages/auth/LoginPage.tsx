import { GridContainer } from '../../components/Grid/GridContainer';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import '../../components/LoginPage/LoginPage.scss';
import { Logo } from '../../components/Logo/Logo';
import React from 'react';
import { LoginSchema } from '../../lib/schemas';
import { login } from '../../store/userData/apiCalls';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [formDataError, setFormDataError] = React.useState<{
    [key: string]: string;
  }>({
    email: '',
    password: '',
  });

  async function handleSubmit() {
    const validatedFormData = LoginSchema.safeParse(formData);

    if (!validatedFormData.success) {
      const errorValues: { [key: string]: string } = {};
      validatedFormData.error.issues.forEach((issue) => {
        errorValues[issue.path[0]] = issue.message;
      });

      setFormDataError(errorValues);
    } else {
      // check if is Admin

      setFormDataError({
        email: '',
        password: '',
      });

      const responseLogin = await login({
        dispatch,
        userData: validatedFormData.data,
      });

      if (responseLogin?.error) {
        toast.error(responseLogin.error);
      }
      if (responseLogin?.data) {
        toast.success('Welcome back');
        navigate('/');
      }
    }
  }
  return (
    <GridContainer>
      <div className='login-container'>
        <div className='flex-center-row-8'>
          <Logo />
          <h2>Login</h2>
        </div>
        <Input
          label={'Email'}
          error={formDataError.email}
          placeholder={' Enter your email'}
          value={formData.email}
          onChange={(e: string): void => {
            setFormData((prev) => ({ ...prev, email: e }));
          }}
          type={'email'}
        />

        <Input
          label={'Password'}
          error={formDataError.password}
          placeholder={' Enter your password'}
          value={formData.password}
          onChange={(e: string): void => {
            setFormData((prev) => ({ ...prev, password: e }));
          }}
          type={'password'}
        />

        <Button onClick={handleSubmit}>Login</Button>
      </div>
    </GridContainer>
  );
}

export default LoginPage;
