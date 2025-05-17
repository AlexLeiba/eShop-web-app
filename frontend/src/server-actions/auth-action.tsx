'use server';

import {
  LoginSchema,
  RegisterSchema,
  type LoginType,
  type RegisterType,
} from '../lib/schemas';

export async function loginAction(
  _: any,
  formData: FormData
): Promise<{
  success: boolean;
  data: LoginType | null;
  errorForm: any;
  errorRequest: any;
}> {
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

  return {
    success: true,
    data: validatedValues.data,
    errorForm: null,
    errorRequest: null,
  };
}

export async function registerAction(
  _: any,
  formData: FormData
): Promise<{
  success: boolean;
  data: RegisterType | null;
  errorForm: any;
  errorRequest: any;
}> {
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
      data: null,
      errorForm: parsedErrors[0],
      errorRequest: null,
    };
  }

  return {
    success: true,
    data: validatedValues.data,
    errorForm: null,
    errorRequest: null,
  };
}
