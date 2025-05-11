import React from 'react';
import bgImage from '../../assets/bg-image.webp';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { LoginSchema } from '../../lib/schemas';

type FormType = {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
function Login() {
  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = React.useState({
    email: '',
    password: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'email' | 'password'
  ) {
    setFormValues({
      ...formValues,
      [target]: e.target.value,
    });
  }

  function handleSubmit() {
    const validatedData = LoginSchema.safeParse(formValues);

    if (!validatedData.success) {
      console.log('success');

      const parsedErrors = validatedData.error.issues.map((issue) => {
        return {
          [issue.path[0]]: issue.message,
        };
      });
      setFormErrors(parsedErrors[0] as FormType);
    }

    if (validatedData.success) {
      console.log('success');
      alert(JSON.stringify(validatedData.data));
    }
  }
  return (
    <div
      className='h-screen flex justify-center items-center relative'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className='absolute top-0 right-0 left-0 bottom-0 w-full h-full z-10 bg-black opacity-50'></div>
      <div className='w-[550px] min-h-[400px] bg-white rounded-md py-6 px-8 flex flex-col gap-4 z-20 justify-between'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-4xl font-semibold'>Login</h1>
          {/* <Spacer size={8} /> */}

          <Input
            label='Email'
            placeholder='Enter your email'
            value={formValues.email}
            onChange={(e) => handleChange(e, 'email')}
            error={formErrors.email}
          />

          <Input
            label='Password'
            placeholder='Enter your password'
            value={formValues.password}
            onChange={(e) => handleChange(e, 'password')}
            error={formErrors.password}
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
        <Button onClick={handleSubmit}>Login</Button>
      </div>
    </div>
  );
}

export default Login;
