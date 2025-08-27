import React, { useEffect } from "react";
import bgImage from "../../assets/bg-image.webp";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import toast from "react-hot-toast";
import { Logo } from "../../components/Navigations/Logo";
import { LanguagesSelect } from "../../components/Language/LanguagesSelect";
import { useSelector } from "react-redux";
import {
  checkOtpForgotPasswordFromEmail,
  resetPasswordFromEmail,
  sendOtpForgotPasswordEmail,
} from "../../store/userData/apiCalls";
import {
  CheckOtpSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "../../lib/schemas";

import type { RootState } from "../../store/store";
import { IconLoader } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  newPassword: "",
  confirmPassword: "",
  otp: "",
};
function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [resetPasswordStep, setResetPasswordStep] = React.useState(1);
  const { t } = useTranslation("translation", {
    keyPrefix: "ForgotPasswordPage",
  });

  const loginState = useSelector((state: RootState) => state?.user);

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

  async function handleSubmitSendEmailCode() {
    if (resetPasswordStep === 1) {
      const validatedValues = ForgotPasswordSchema.safeParse(formData);

      if (!validatedValues.success) {
        const errorValues: { [key: string]: string } = {};

        validatedValues.error.issues.forEach((issue) => {
          errorValues[issue.path[0]] = issue.message;
        });

        setFormDataErrors(errorValues);
      }

      if (validatedValues.success) {
        const responseLogin = await sendOtpForgotPasswordEmail({
          email: validatedValues.data.email,
        });

        if (responseLogin?.data) {
          toast.success(t("toast.emailSentMessage"));
          setResetPasswordStep(2);
        }
        if (responseLogin?.error) {
          toast.error(responseLogin.error);
        }
      }
    }

    if (resetPasswordStep === 2) {
      const validatedValues = CheckOtpSchema.safeParse(formData);

      if (!validatedValues.success) {
        const errorValues: { [key: string]: string } = {};

        validatedValues.error.issues.forEach((issue) => {
          errorValues[issue.path[0]] = issue.message;
        });

        setFormDataErrors(errorValues);
      }

      if (validatedValues.success) {
        const responseLogin = await checkOtpForgotPasswordFromEmail({
          email: validatedValues.data.email,
          otp: Number(validatedValues.data.otp),
        });

        if (responseLogin?.data) {
          toast.success(t("toast.otpCheckMessage"));
          setResetPasswordStep(3);
        }
        if (responseLogin?.error) {
          toast.error(responseLogin.error);
        }
      }
    }
    if (resetPasswordStep === 3) {
      const validatedValues = ResetPasswordSchema.safeParse(formData);

      if (!validatedValues.success) {
        const errorValues: { [key: string]: string } = {};

        validatedValues.error.issues.forEach((issue) => {
          errorValues[issue.path[0]] = issue.message;
        });

        setFormDataErrors(errorValues);
      }

      if (validatedValues.success) {
        const responseLogin = await resetPasswordFromEmail({
          email: validatedValues.data.email,
          password: validatedValues.data.newPassword,
        });

        if (responseLogin?.data) {
          toast.success(t("toast.resetPasswordMessage"));
          setResetPasswordStep(1);
          navigate("/login");
        }
        if (responseLogin?.error) {
          toast.error(responseLogin.error);
        }
      }
    }
  }

  useEffect(() => {
    setFormData({
      email: "",
      newPassword: "",
      confirmPassword: "",
      otp: "",
    });
  }, []);

  return (
    <div
      className="h-screen flex justify-center items-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute top-0 right-0 left-0 bottom-0 w-full h-full z-10 bg-black opacity-50"></div>
      <div className="w-[550px]  bg-white rounded-md py-6 px-8  gap-4 z-20 flex flex-col justify-between  min-h-[400px]">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-4xl font-semibold">{t("title")}</h1>
            <div className="flex gap-4 items-center">
              <LanguagesSelect />
              <Logo />
            </div>
          </div>
          {resetPasswordStep === 1 && (
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
          )}

          {resetPasswordStep === 2 && (
            <Input
              label={`${t("passCode.label")} *`}
              placeholder={t("passCode.placeholder")}
              name="number"
              error={formDataErrors.otp as string}
              value={formData.otp as string}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                handleChange(e.currentTarget.value, "otp")
              }
            />
          )}
          {resetPasswordStep === 3 && (
            <>
              <Input
                type="password"
                label={`${t("newPassword.label")} *`}
                placeholder={t("newPassword.placeholder")}
                name="newPassword"
                error={formDataErrors.newPassword as string}
                value={formData.newPassword as string}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, "newPassword")
                }
              />
              <Input
                type="password"
                label={`${t("confirmPassword.label")} *`}
                placeholder={t("confirmPassword.placeholder")}
                name="confirmPassword"
                error={formDataErrors.confirmPassword as string}
                value={formData.confirmPassword as string}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChange(e.currentTarget.value, "confirmPassword")
                }
              />
            </>
          )}

          <div className="flex gap-4">
            <p className="text-sm text-gray-500">
              <a href="/register" className="cursor-pointer underline">
                {t("register")}
              </a>
            </p>
            <p className="text-sm text-gray-500">
              <a href="/login" className="cursor-pointer underline">
                {t("login")}
              </a>
            </p>
          </div>
        </div>
        <Button
          onClick={handleSubmitSendEmailCode}
          disabled={loginState.isFetching}
          type="submit"
        >
          {loginState.isFetching ? (
            <IconLoader className="ml-2 animate-spin" />
          ) : resetPasswordStep === 1 ? (
            t("buttonResetPassword")
          ) : resetPasswordStep === 2 ? (
            t("buttonSendCode")
          ) : (
            t("saveNewPassword")
          )}
        </Button>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
