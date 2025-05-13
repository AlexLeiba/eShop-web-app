import React, { useEffect } from 'react';
import bgImage from '../../assets/bg-image.webp';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { loginAction } from '../../server-actions/auth-action';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Navigations/Logo';

function Login() {
  const navigate = useNavigate();
  const [stateLoginAction, formLoginAction] = React.useActionState(
    loginAction,
    null
  );

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e: string, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e,
    }));
  };

  useEffect(() => {
    if (stateLoginAction?.success) {
      // check token
      // if all good redirect to dashboard
      navigate('/');
    }
    if (stateLoginAction?.errorRequest) {
      toast.error(stateLoginAction?.errorRequest);
    }
  }, [stateLoginAction?.success]);

  return (
    <div
      className='h-screen flex justify-center items-center relative'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className='absolute top-0 right-0 left-0 bottom-0 w-full h-full z-10 bg-black opacity-50'></div>
      <div className='w-[550px]  bg-white rounded-md py-6 px-8  gap-4 z-20 '>
        <form
          action={formLoginAction}
          className=' flex flex-col justify-between h-full min-h-[400px]'
        >
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between'>
              <h1 className='text-4xl font-semibold'>Login</h1>
              <Logo />
            </div>

            <Input
              label='Email *'
              placeholder='Enter your email'
              name='email'
              error={stateLoginAction?.errorForm?.email as string}
              value={formData.email as string}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                handleChange(e.currentTarget.value, 'email')
              }
            />

            <Input
              label='Password *'
              placeholder='Enter your password'
              name='password'
              error={stateLoginAction?.errorForm?.password as string}
              value={formData.password as string}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                handleChange(e.currentTarget.value, 'password')
              }
            />

            <p className='text-sm text-gray-500'>
              Do not have an account?{' '}
              <a href='/register' className='cursor-pointer underline'>
                Register
              </a>
            </p>

            <p className='text-sm text-gray-500'>
              By creating an account you agree to our{' '}
              <a className='cursor-pointer underline'>Terms and Conditions</a>
            </p>
          </div>
          <Button type='submit'>Login</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
