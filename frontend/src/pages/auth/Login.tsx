import React, { useEffect } from "react";
import bgImage from "../../assets/bg-image.webp";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import toast from "react-hot-toast";
import { Logo } from "../../components/Navigations/Logo";
import { LanguagesSelect } from "../../components/Language/LanguagesSelect";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/userData/apiCalls";
import { LoginSchema } from "../../lib/schemas";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import { IconLoader } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const initialState = {
  email: "",
  password: "",
};
function Login() {
  const { t } = useTranslation("translation", { keyPrefix: "LoginPage" });

  const loginState = useSelector((state: RootState) => state?.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    const validatedValues = LoginSchema.safeParse(allFormFields);

    if (!validatedValues.success) {
      const errorValues: { [key: string]: string } = {};

      validatedValues.error.issues.forEach((issue) => {
        errorValues[issue.path[0]] = issue.message;
      });

      setFormDataErrors(errorValues);
    }

    if (validatedValues.success) {
      const responseLogin = await login({
        dispatch,
        user: validatedValues.data,
      });

      if (responseLogin?.data) {
        toast.success(t("toast.loginSuccessful"));
        navigate("/");
      }
      if (responseLogin?.error) {
        toast.error(responseLogin.error);
      }
    }
  }

  useEffect(() => {
    setFormData({
      email: "",
      password: "",
    });

    document.title = "Login | eShop App";
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute("content", "Shoping app");
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = "Shoping app";
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <div
      className="h-screen flex justify-center items-center relative overflow-y-auto"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute top-0 right-0 left-0 bottom-0 w-full h-full z-10 bg-black opacity-50"></div>
      <div className="w-[550px] min-h-[450px]  bg-white rounded-md py-6 px-8  gap-4 z-20 ">
        <form
          id="login-form"
          onSubmit={handleSubmit}
          className=" flex flex-col justify-between h-full min-h-[400px]"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h1 className="text-4xl font-semibold">{t("title")}</h1>
              <div className="flex gap-4 items-center">
                <LanguagesSelect />
                <Logo />
              </div>
            </div>

            <Input
              label={`${t("email.label")} *`}
              placeholder={t("email.placeholder")}
              name="email"
              error={formDataErrors.email as string}
              value={formData.email as string}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                handleChange(e.currentTarget.value, "email")
              }
            />

            <Input
              type="password"
              label={`${t("password.label")} *`}
              placeholder={t("password.placeholder")}
              name="password"
              error={formDataErrors.password as string}
              value={formData.password as string}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                handleChange(e.currentTarget.value, "password")
              }
            />

            <p className="text-sm text-gray-500">
              {t("doNotHaveAccount")}{" "}
              <a
                href="/register"
                className="cursor-pointer underline hover:text-gray-800"
              >
                {t("register")}
              </a>
            </p>

            <p className="text-sm text-gray-500">
              {t("byCreatingAccount")}{" "}
              <a className="cursor-pointer underline hover:text-gray-800">
                {t("termsAndConditions")}
              </a>{" "}
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
          <Button disabled={loginState.isFetching} type="submit">
            {loginState.isFetching ? (
              <IconLoader className="ml-2 animate-spin" />
            ) : (
              t("loginButton")
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
