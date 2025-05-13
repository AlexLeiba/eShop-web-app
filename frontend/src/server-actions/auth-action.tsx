'use server';

import { LoginSchema, RegisterSchema } from '../lib/schemas';

export async function loginAction(_: any, formData: FormData) {
  const formParsedData = Object.fromEntries(formData.entries());

  const validatedValues = LoginSchema.safeParse(formParsedData);

  if (!validatedValues.success) {
    const parsedErrors = validatedValues.error.issues.map((issue) => {
      return {
        [issue.path[0]]: issue.message,
      };
    });

    return {
      success: false,
      data: null,
      errorForm: parsedErrors[0],
      errorRequest: null,
    };
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formParsedData),
      }
    );

    const { data, error } = await response.json();

    return {
      success: response.ok,
      data: data,
      errorForm: null,
      errorRequest: error,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      errorForm: null,
      errorRequest: error,
    };
  }
}

export async function registerAction(_: any, formData: FormData) {
  const formParsedData = Object.fromEntries(formData.entries());

  const validatedValues = RegisterSchema.safeParse(formParsedData);

  if (!validatedValues.success) {
    const parsedErrors = validatedValues.error.issues.map((issue) => {
      return {
        [issue.path[0]]: issue.message,
      };
    });

    return {
      success: false,
      data: formParsedData,
      errorForm: parsedErrors[0],
      errorRequest: null,
    };
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formParsedData),
      }
    );
    const { data, error } = await response.json();

    return {
      success: response.ok,
      data: data,
      errorForm: null,
      errorRequest: error,
    };
  } catch (error) {
    console.log('🚀 ~ registerAction ~ error:', error);
    return {
      success: false,
      data: null,
      errorForm: null,
      errorRequest: error,
    };
  }

  //   return {
  //     success: true,
  //     data: formParsedData,
  //     error: null,
  //   }
}
