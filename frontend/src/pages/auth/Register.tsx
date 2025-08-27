import React, { useEffect } from "react";
import bgImage from "../../assets/bg-image.webp";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../components/Navigations/Logo";
import { LanguagesSelect } from "../../components/Language/LanguagesSelect";
import { RegisterSchema } from "../../lib/schemas";
import { IconLoader } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../../lib/axiosInstance";

const initialState = {
  name: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  const { t } = useTranslation("translation", { keyPrefix: "RegisterPage" });
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState(initialState);
  const [formDataErrors, setFormDataErrors] = React.useState<{
    [key: string]: string;
  }>(initialState);

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
      setFormDataErrors(initialState);
      setLoading(true);
      try {
        const response = await axiosInstance({
          url: `/api/register`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: validatedValues.data,
        });

        if (response.status === 201) {
          toast.success(t("toast.registeredSuccessfully"));
          navigate("/login");
        }
      } catch (error: any) {
        toast.error(error.response.data.error || error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    setFormData(initialState);
  }, []);

  return (
    <div
      className="h-screen flex justify-center items-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute top-0 right-0 left-0 bottom-0 w-full h-full z-10 bg-black opacity-50"></div>
      <div className="w-[550px]  bg-white rounded-md py-6 px-8 flex flex-col gap-4 z-20 ">
        <form
          id="register-form"
          onSubmit={handleSubmit}
          className="flex flex-col justify-between h-full min-h-[450px]"
        >
          <div className="flex flex-col gap-4 space-y-2">
            <div className="flex justify-between">
              <h1 className="text-4xl font-semibold">{t("title")}</h1>
              <div className="flex gap-4 items-center">
                <LanguagesSelect />
                <Logo />
              </div>
            </div>

            <div className="flex gap-4">
              <Input
                label={`${t("firstName.label")}`}
                placeholder={t("firstName.placeholder")}
                name="name"
                value={formData.name as string}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, "name")
                }
                error={formDataErrors.name as string}
              />
              <Input
                label={`${t("lastName.label")}`}
                placeholder={t("lastName.placeholder")}
                name="lastName"
                value={formData.lastName}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, "lastName")
                }
                error={formDataErrors.lastName as string}
              />
            </div>
            <div className="flex gap-4">
              <Input
                type="text"
                label={`${t("username.label")} *`}
                placeholder={t("username.placeholder")}
                name="userName"
                value={formData.userName}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, "userName")
                }
                error={formDataErrors.userName as string}
              />
              <Input
                type="email"
                label={`${t("email.label")} *`}
                placeholder={t("email.placeholder")}
                name="email"
                value={formData.email}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, "email")
                }
                error={formDataErrors.email as string}
              />
            </div>
            <div className="flex gap-4">
              <Input
                type="password"
                label={`${t("password.label")} *`}
                placeholder={t("password.placeholder")}
                name="password"
                value={formData.password}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, "password")
                }
                error={formDataErrors.password as string}
              />
              <Input
                type="password"
                label={`${t("confirmPassword.label")} *`}
                placeholder={t("confirmPassword.placeholder")}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, "confirmPassword")
                }
                error={formDataErrors.confirmPassword as string}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500 ">
                {t("alreadyHaveAccount")}{" "}
                <a
                  href="/login"
                  className="cursor-pointer underline hover:text-gray-800"
                >
                  {t("login")}
                </a>
              </p>

              <p className="text-sm text-gray-500">
                {t("byCreatingAccount")}{" "}
                <a className="cursor-pointer underline hover:text-gray-800">
                  {" "}
                  {t("termsAndConditions")}
                </a>
              </p>
              <p className="text-sm text-gray-500">
                <Link
                  className="cursor-pointer underline hover:text-gray-800"
                  to="/forgot-password"
                >
                  {t("forgotPassword")}
                </Link>{" "}
              </p>
            </div>
          </div>
          <Button disabled={loading} type="submit" className="mt-4">
            {loading ? (
              <IconLoader className="ml-2 animate-spin" />
            ) : (
              t("registerButton")
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
