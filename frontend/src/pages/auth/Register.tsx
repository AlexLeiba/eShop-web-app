import React from 'react';
import bgImage from '../../assets/bg-image.webp';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { RegisterSchema } from '../../lib/schemas';

type FormType = {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
function Register() {
  const [formValues, setFormValues] = React.useState({
    name: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = React.useState({
    name: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    target:
      | 'name'
      | 'lastName'
      | 'userName'
      | 'email'
      | 'password'
      | 'confirmPassword'
  ) {
    setFormValues({
      ...formValues,
      [target]: e.target.value,
    });
  }

  function handleSubmit() {
    const validatedData = RegisterSchema.safeParse(formValues);

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
          <h1 className='text-4xl font-semibold'>Register</h1>
          {/* <Spacer size={8} /> */}
          <div className='flex gap-4'>
            <Input
              label='Name'
              placeholder='Enter your name'
              value={formValues.name}
              onChange={(e) => handleChange(e, 'name')}
              error={formErrors.name}
            />
            <Input
              label='Last Name'
              placeholder='Enter your last name'
              value={formValues.lastName}
              onChange={(e) => handleChange(e, 'lastName')}
              error={formErrors.lastName}
            />
          </div>
          <div className='flex gap-4'>
            <Input
              label='Username'
              placeholder='Enter your username'
              value={formValues.userName}
              onChange={(e) => handleChange(e, 'userName')}
              error={formErrors.userName}
            />
            <Input
              label='Email'
              placeholder='Enter your email'
              value={formValues.email}
              onChange={(e) => handleChange(e, 'email')}
              error={formErrors.email}
            />
          </div>
          <div className='flex gap-4'>
            <Input
              label='Password'
              placeholder='Enter your password'
              value={formValues.password}
              onChange={(e) => handleChange(e, 'password')}
              error={formErrors.password}
            />
            <Input
              label='Confirm Password'
              placeholder='Enter your password'
              value={formValues.confirmPassword}
              onChange={(e) => handleChange(e, 'confirmPassword')}
              error={formErrors.confirmPassword}
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
        <Button onClick={handleSubmit}>Register</Button>
      </div>
    </div>
  );
}

export default Register;
