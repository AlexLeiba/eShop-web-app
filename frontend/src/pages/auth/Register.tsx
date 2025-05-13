import React, { useEffect } from 'react';
import bgImage from '../../assets/bg-image.webp';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { registerAction } from '../../server-actions/auth-action';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Navigations/Logo';

function Register() {
  const navigate = useNavigate();
  const [formActionState, setFormActionState] = React.useActionState(
    registerAction,
    null
  );

  const [formData, setFormData] = React.useState({
    name: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: string, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e,
    }));
  };

  useEffect(() => {
    if (formActionState?.success) {
      toast.success('User was registered successfully');

      setFormData({
        name: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      navigate('/login');
    }
    if (formActionState?.errorRequest) {
      toast.error(formActionState?.errorRequest);
    }
  }, [formActionState?.success]);

  return (
    <div
      className='h-screen flex justify-center items-center relative'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className='absolute top-0 right-0 left-0 bottom-0 w-full h-full z-10 bg-black opacity-50'></div>
      <div className='w-[550px]  bg-white rounded-md py-6 px-8 flex flex-col gap-4 z-20 '>
        <form
          action={setFormActionState}
          className='flex flex-col justify-between h-full min-h-[450px]'
        >
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between'>
              <h1 className='text-4xl font-semibold'>Register</h1>
              <Logo />
            </div>

            <div className='flex gap-4'>
              <Input
                label='Name'
                placeholder='Enter your name'
                name='name'
                value={formData.name as string}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, 'name')
                }
                error={formActionState?.errorForm?.name as string}
              />
              <Input
                label='Last Name'
                placeholder='Enter your last name'
                name='lastName'
                value={formData.lastName}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, 'lastName')
                }
                error={formActionState?.errorForm?.lastName as string}
              />
            </div>
            <div className='flex gap-4'>
              <Input
                label='Username *'
                placeholder='Enter your username'
                name='userName'
                value={formData.userName}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, 'userName')
                }
                error={formActionState?.errorForm?.userName as string}
              />
              <Input
                label='Email *'
                placeholder='Enter your email'
                name='email'
                value={formData.email}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, 'email')
                }
                error={formActionState?.errorForm?.email as string}
              />
            </div>
            <div className='flex gap-4'>
              <Input
                label='Password *'
                placeholder='Enter your password'
                name='password'
                value={formData.password}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, 'password')
                }
                error={formActionState?.errorForm?.password as string}
              />
              <Input
                label='Confirm Password *'
                placeholder='Enter your password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, 'confirmPassword')
                }
                error={formActionState?.errorForm?.confirmPassword as string}
              />
            </div>
            <p className='text-sm text-gray-500'>
              Already have an account?{' '}
              <a href='/login' className='cursor-pointer underline'>
                Login
              </a>
            </p>

            <p className='text-sm text-gray-500'>
              By creating an account you agree to our{' '}
              <a className='cursor-pointer underline'>Terms and Conditions</a>
            </p>
          </div>
          <Button type='submit'>Register</Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
