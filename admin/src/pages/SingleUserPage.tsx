import React from "react";
import { Layout } from "../components/Layout/Layout";
import { GridContainer } from "../components/Grid/GridContainer";
import Spacer from "../components/ui/Spacer";
import { WidgetCard } from "../components/ui/WidgetCard";
import { Input } from "../components/ui/Input/Input";
import { Button } from "../components/ui/Button/Button";
import { EditUserSchema } from "../lib/schemas";
import toast from "react-hot-toast";
import { apiFactory } from "../lib/apiFactory";
import { useSelector } from "react-redux";
import type { RootState } from "../store/config";
import { useLocation, useNavigate } from "react-router-dom";
import type { UserType } from "../lib/types";
import {
  initialErrorsObject,
  initialFormData,
} from "../components/SingleUserPage/initialData";
import "../components/SingleProductPage/SingleProductPage.scss";

function SingleUserPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const selectedUserId = pathname.split("/")[2];

  const userData = useSelector((state: RootState) => state.user.userData);
  const sessionToken = userData?.token || "";

  const [formData, setFormData] =
    React.useState<Omit<UserType, "_id" | "id">>(initialFormData);
  const [formDataErrors, setFormDataErrors] = React.useState<{
    [key: string]: string;
  }>(initialErrorsObject);

  React.useEffect(() => {
    if (!userData?.data.isUberAdmin) {
      navigate("/");
    }
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiFactory().getUser({
          userId: selectedUserId,
          token: sessionToken,
        });

        if (response.error) {
          toast.error(response.error);
          return;
        }
        setFormData(response.data);
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    fetchData();
  }, []);

  function handleChangeFormData(
    key: string,
    value: string | string[] | boolean
  ) {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  async function handleSubmit() {
    const validatedFormData = EditUserSchema.safeParse(formData);

    if (!validatedFormData.success) {
      const errorValues: { [key: string]: string } = {};

      validatedFormData.error.issues.forEach((issue) => {
        errorValues[issue.path[0]] = issue.message;
      });

      setFormDataErrors(errorValues);
    } else {
      setFormDataErrors(initialErrorsObject);

      try {
        if (!userData?.data.isUberAdmin && formData.isUberAdmin) {
          throw new Error("Not authorized to edit uber admin");
        }
        toast.loading("Saving...", {
          id: "savingToastId",
        });

        const response = await apiFactory().editUser({
          userData: validatedFormData.data,
          userId: pathname.split("/")[2],
          token: sessionToken,
        });

        if (response.error) {
          toast.error(response.error);
          return;
        }

        toast.success("User was edited successfully");
        navigate("/users");
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        toast.dismiss("savingToastId");
      }
    }
  }
  return (
    <Layout>
      <GridContainer fluid>
        <h1>Edit user</h1>
        <Spacer size={24} />

        {/* EDIT USER */}
        <WidgetCard>
          <h3>Edit product</h3>
          <Spacer size={24} />

          <div className="grid-container-2-equal">
            <Input
              label="Name"
              placeholder="Enter name"
              error={formDataErrors.name}
              value={formData?.name as string}
              onChange={(v) => handleChangeFormData("name", v)}
              type={"text"}
            />
            <Input
              label="Username"
              placeholder="Enter username"
              error={formDataErrors.userName}
              value={formData.userName}
              onChange={(v) => handleChangeFormData("userName", v)}
              type={"text"}
            />
          </div>
          <Spacer />
          <div className="grid-container-2-equal">
            <Input
              label="Last Name"
              placeholder="Enter last name"
              error={formDataErrors.lastName}
              value={formData.lastName as string}
              onChange={(v) => handleChangeFormData("lastName", v)}
              type={"text"}
            />
          </div>
          <Spacer />

          {userData?.data._id !== selectedUserId && !formData.isUberAdmin && (
            <div className="flex-center-row-8">
              <label htmlFor="isAdmin">is Admin</label>
              <input
                checked={formData.isAdmin}
                type="checkbox"
                id="isAdmin"
                onChange={(e) =>
                  handleChangeFormData("isAdmin", e.target.checked)
                }
              />
              <p className="text-error">{formDataErrors.isPublished}</p>
            </div>
          )}

          <Spacer />
          <Button onClick={handleSubmit}>Save</Button>
        </WidgetCard>
      </GridContainer>
    </Layout>
  );
}

export default SingleUserPage;
