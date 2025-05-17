import React from 'react';
import bgImage from '../../assets/bg-image.webp';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Navigations/Logo';
import { LanguagesSelect } from '../../components/Language/LanguagesSelect';
import { RegisterSchema } from '../../lib/schemas';
import { IconLoader } from '@tabler/icons-react';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formDataErrors, setFormDataErrors] = React.useState<{
    [key: string]: string;
  }>({
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const allFormFields = Object.fromEntries(formData.entries());

    const validatedValues = RegisterSchema.safeParse(allFormFields);

    if (!validatedValues.success) {
      const errorValues: { [key: string]: string } = {};
      validatedValues.error.issues.forEach((issue) => {
        errorValues[issue.path[0]] = issue.message;
      });

      setFormDataErrors(errorValues);
    }

    if (validatedValues.success) {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedValues.data),
          }
        );
        const responseData = await response.json();

        if (responseData.data) {
          toast.success('User was registered successfully');
          navigate('/login');
        }
        if (responseData.error) {
          toast.error(responseData.error);
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div
      className='h-screen flex justify-center items-center relative'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className='absolute top-0 right-0 left-0 bottom-0 w-full h-full z-10 bg-black opacity-50'></div>
      <div className='w-[550px]  bg-white rounded-md py-6 px-8 flex flex-col gap-4 z-20 '>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-between h-full min-h-[450px]'
        >
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between'>
              <h1 className='text-4xl font-semibold'>Register</h1>
              <div className='flex gap-4 items-center'>
                <LanguagesSelect />
                <Logo />
              </div>
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
                error={formDataErrors.name as string}
              />
              <Input
                label='Last Name'
                placeholder='Enter your last name'
                name='lastName'
                value={formData.lastName}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, 'lastName')
                }
                error={formDataErrors.lastName as string}
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
                error={formDataErrors.userName as string}
              />
              <Input
                label='Email *'
                placeholder='Enter your email'
                name='email'
                value={formData.email}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, 'email')
                }
                error={formDataErrors.email as string}
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
                error={formDataErrors.password as string}
              />
              <Input
                label='Confirm Password *'
                placeholder='Enter your password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, 'confirmPassword')
                }
                error={formDataErrors.confirmPassword as string}
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
          <Button disabled={loading} type='submit'>
            {loading ? (
              <IconLoader className='ml-2 animate-spin' />
            ) : (
              'Register'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
