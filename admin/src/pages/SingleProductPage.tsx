import React, { useRef } from "react";
import { Layout } from "../components/Layout/Layout";
import { GridContainer } from "../components/Grid/GridContainer";
import Spacer from "../components/ui/Spacer";
import { WidgetCard } from "../components/ui/WidgetCard";
import { Input } from "../components/ui/Input/Input";
import { Button } from "../components/ui/Button/Button";
import { EditProductSchema, type ProductType } from "../lib/schemas";
import { CATEGORIES, COLORS, SIZES } from "../lib/consts";
import toast from "react-hot-toast";
import { PreviewProductDetails } from "../components/SingleProductPage/PreviewProductDetails";
import { apiFactory } from "../lib/apiFactory";
import { useSelector } from "react-redux";
import type { RootState } from "../store/config";
import { useLocation, useNavigate } from "react-router-dom";
import {
  initialErrorsObject,
  initialFormData,
} from "../components/SingleProductPage/initialData";
import { IconX } from "@tabler/icons-react";
import "../components/SingleProductPage/SingleProductPage.scss";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function SingleProductPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const selectedProductId = pathname.split("/")[2];

  const userData = useSelector((state: RootState) => state.user.userData);
  const sessionToken = userData?.token || "";

  const uploadImageRef = useRef<HTMLInputElement>(null);
  const uploadMultipleImageRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = React.useState<ProductType>(initialFormData);
  const [formDataErrors, setFormDataErrors] = React.useState<{
    [key: string]: string;
  }>(initialErrorsObject);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiFactory().getProduct({
          productId: selectedProductId,
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

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setFormData((prev) => {
          return {
            ...prev,
            image: reader.result as string,
          };
        });
      };
    }
  }
  function handleMultipleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData((prev) => {
          return {
            ...prev,
            images: [
              ...prev.images,
              {
                colorName: formData.imageColor,
                image: reader.result as string,
                imageId: "",
              },
            ],
          };
        });
      };
    }
  }

  function handleDeleteCoverImage() {
    setFormData((prev) => {
      return {
        ...prev,
        image: "",
      };
    });
  }

  function handleDeleteProductImage(image: string) {
    setFormData((prev) => {
      return {
        ...prev,
        images: prev.images.filter((item) => item.image !== image),
      };
    });
  }

  async function handleSubmit() {
    const validatedFormData = EditProductSchema.safeParse(formData);

    if (!validatedFormData.success) {
      const errorValues: { [key: string]: string } = {};

      validatedFormData.error.issues.forEach((issue) => {
        errorValues[issue.path[0]] = issue.message;
      });

      setFormDataErrors(errorValues);
    } else {
      const bodyData = {
        ...validatedFormData.data,
        title: validatedFormData.data.enTitle,
        description: validatedFormData.data.enDescription,
        color: validatedFormData.data.images.map((item) => item.colorName),
      };
      setFormDataErrors(initialErrorsObject);

      try {
        toast.loading("Saving...", {
          id: "savingToastId",
        });

        const response = await apiFactory().editProduct({
          productData: bodyData,
          productId: pathname.split("/")[2],
          token: sessionToken,
        });

        if (response.error) {
          toast.error(response.error);
          return;
        }

        toast.success("Product was edited successfully");
        navigate("/products");
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
        <div className="flex-between-center">
          <h1>Product</h1>
          <div>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
        <Spacer size={24} />

        <div>
          {/* SALES PERFORMANCE CHART */}
          {/* <WidgetCard>
            <ProductPerformanceChart />
          </WidgetCard> */}

          {/* PREVIEW PRODUCT DETAILS */}
          <WidgetCard>
            <PreviewProductDetails formData={formData} />
          </WidgetCard>
        </div>

        <Spacer size={24} />
        {/* EDIT PRODUCT */}
        <WidgetCard>
          <h3>Edit product</h3>
          <Spacer size={24} />

          <div className="grid-container-2-equal">
            <div className="flex-center-row-8">
              <label htmlFor="isPublished">
                <b>Published</b>
              </label>
              <input
                checked={formData.isPublished}
                type="checkbox"
                id="isPublished"
                onChange={(e) =>
                  handleChangeFormData("isPublished", e.target.checked)
                }
              />
              <p className="text-error">{formDataErrors.isPublished}</p>
            </div>

            <div className="flex-center-row-8">
              <label htmlFor="inStock">
                <b>In Stock</b>
              </label>
              <input
                checked={formData.inStock}
                type="checkbox"
                id="inStock"
                onChange={(e) =>
                  handleChangeFormData("inStock", e.target.checked)
                }
              />
              <p className="text-error">{formDataErrors.inStock}</p>
            </div>
            <Input
              label="En Title"
              placeholder="Enter en title"
              error={formDataErrors.enTitle}
              value={formData.enTitle}
              onChange={(v) => handleChangeFormData("enTitle", v)}
              type={"text"}
            />
            <Input
              label="Ro Title"
              placeholder="Enter ro title"
              error={formDataErrors.roTitle}
              value={formData.roTitle}
              onChange={(v) => handleChangeFormData("roTitle", v)}
              type={"text"}
            />
            <Input
              label="En Description"
              placeholder="Enter en description"
              error={formDataErrors.enDescription}
              value={formData.enDescription}
              onChange={(v) => handleChangeFormData("enDescription", v)}
              type={"textarea"}
            />
            <Input
              label="Ro Description"
              placeholder="Enter ro description"
              error={formDataErrors.roDescription}
              value={formData.roDescription}
              onChange={(v) => handleChangeFormData("roDescription", v)}
              type={"textarea"}
            />
          </div>
          <Spacer />
          <div className="grid-container-2-equal">
            <Input
              label="Price"
              placeholder="Enter product price"
              error={formDataErrors.price}
              value={formData.price}
              onChange={(v) => handleChangeFormData("price", v)}
              type={"number"}
            />
            <Input
              label="Discount Price"
              placeholder="Enter the discount price"
              error={formDataErrors.discountPrice}
              value={(formData.discountPrice as string) || ""}
              onChange={(v) => handleChangeFormData("discountPrice", v)}
              type={"number"}
            />

            <Input
              label="Quantity"
              placeholder="Enter product quantity"
              error={formDataErrors.quantity}
              value={formData?.quantity as string}
              onChange={(v) => handleChangeFormData("quantity", v)}
              type={"number"}
            />

            <div></div>
            {/* SINGLE IMAGE COVER */}
            <div className="select-single-image-container">
              <div className="flex-column-gap-12">
                <label htmlFor="image">
                  <b>Cover Image</b>
                </label>
                <input
                  ref={uploadImageRef}
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                />
                <Button
                  buttonVariant="green"
                  onClick={() => uploadImageRef.current?.click()}
                >
                  Upload Image
                </Button>
                <p className="text-error">{formDataErrors.image}</p>
              </div>

              {/* Preview image cover */}
              <div>
                <p>
                  <b>Preview Cover Image</b>
                </p>
                <Spacer />
                {formData.image && (
                  <div className="preview-image-cover-card">
                    <Spacer size={8} />
                    {formData.image && (
                      <>
                        <IconX
                          className="clear-cover-image-icon"
                          cursor={"pointer"}
                          onClick={handleDeleteCoverImage}
                        />
                        <img src={formData.image} alt={"cover-image"} />
                      </>
                    )}
                    <Spacer />
                  </div>
                )}
              </div>
            </div>

            {/*MULTIPLE IMAGES WITH COLORS */}
            <div className="select-mltiple-images-container">
              <div>
                <div>
                  <Spacer size={8} />
                  <p>
                    <b>Select image color</b>
                  </p>
                  <Spacer size={8} />
                  <select
                    className="select"
                    onChange={(e) => {
                      const selecteOptionsArray = Array.from(
                        e.target.selectedOptions
                      ).map((option) => option.value);

                      handleChangeFormData(
                        "imageColor",
                        selecteOptionsArray[0]
                      );
                    }}
                  >
                    {COLORS.map((item) => {
                      return (
                        <option key={item.value} value={item.value}>
                          {item.title}
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-error"> {formDataErrors.imageColor}</p>
                </div>
                <Spacer size={12} />
                <div>
                  <div>
                    <label htmlFor="image">
                      <b>Upload color Images</b>
                    </label>
                    <Spacer size={8} />
                    <input
                      ref={uploadMultipleImageRef}
                      type="file"
                      id="images"
                      onChange={handleMultipleImageChange}
                    />
                    <Button
                      buttonVariant="green"
                      onClick={() => uploadMultipleImageRef.current?.click()}
                    >
                      Upload Image
                    </Button>
                    <p className="text-error">{formDataErrors.images}</p>
                  </div>
                </div>
              </div>
              {formData.images && (
                <div>
                  <p>
                    <b>Preview Color Images</b>
                  </p>
                  <Spacer size={8} />
                  <div className="container-multiple-images">
                    {formData.images.map((item) => {
                      return (
                        <div
                          key={item.colorName + item.image}
                          className="multiple-images-card"
                        >
                          <IconX
                            className="clear-cover-image-icon"
                            cursor={"pointer"}
                            onClick={() => handleDeleteProductImage(item.image)}
                          />
                          {item.image && (
                            <img src={item.image} alt={"cover-image"} />
                          )}
                          <Spacer />
                          <p>{item.colorName}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <Spacer />

          <div className="grid-container-2-equal">
            <div className="flex-column-gap-12">
              <div className="flex-column">
                <p>
                  <b>Category</b>
                </p>
                <Spacer size={8} />
                <select
                  value={formData.categories[0]}
                  className="select"
                  onChange={(e) =>
                    handleChangeFormData("categories", [e.target.value])
                  }
                >
                  {CATEGORIES.map((item) => {
                    return (
                      <option key={item.value} value={item.value}>
                        {item.title}
                      </option>
                    );
                  })}
                </select>
                <p className="text-error">{formDataErrors.categories}</p>
              </div>

              <div>
                <Spacer size={8} />
                <p>
                  <b>Sizes</b>
                </p>
                <Spacer size={8} />
                <select
                  value={formData.size.map((item) => item)}
                  multiple
                  className="select"
                  onChange={(e) => {
                    const selectedOptionsArray = Array.from(
                      e.target.selectedOptions
                    ).map((option) => option.value);
                    handleChangeFormData("size", selectedOptionsArray);
                  }}
                >
                  {SIZES.map((item) => {
                    return (
                      <option key={item.value} value={item.value}>
                        {item.title}
                      </option>
                    );
                  })}
                </select>
                <p className="text-error"> {formDataErrors.size}</p>
              </div>
            </div>

            <div className="flex-column-gap-12">
              <Spacer size={12} />
              <div className="flex-center-row-8">
                <label htmlFor="featured">
                  <b>Featured product</b>
                </label>
                <input
                  checked={formData.featured}
                  type="checkbox"
                  id="featured"
                  onChange={(e) =>
                    handleChangeFormData("featured", e.target.checked)
                  }
                />
                <p className="text-error">{formDataErrors.featured}</p>
              </div>

              <div className="flex-column">
                <label htmlFor="featuredBackgroundColor">
                  <b>Featured Background Color</b>
                </label>
                <Spacer size={8} />
                <input
                  value={formData.featuredBackgroundColor}
                  type="color"
                  id="featuredBackgroundColor"
                  onChange={(e) =>
                    handleChangeFormData(
                      "featuredBackgroundColor",
                      e.target.value
                    )
                  }
                />
                <p className="text-error">
                  {formDataErrors.featuredBackgroundColor}
                </p>
              </div>
            </div>
          </div>

          <div className="quill-container">
            <div>
              <label htmlFor="featuredBackgroundColor">
                <b> EN Additional info</b>
              </label>
              <Spacer size={8} />
              <ReactQuill
                className="text-editor"
                value={formData?.enMoreInfo as string}
                onChange={(v) => handleChangeFormData("enMoreInfo", v)}
                // onKeyDown={(e) => handleKeyDown(e)}
                theme="snow"
                placeholder="Write your article here..."
              />
            </div>
            <div>
              <label htmlFor="featuredBackgroundColor">
                <b>RO Additional info </b>
              </label>
              <Spacer size={8} />
              <ReactQuill
                value={formData?.roMoreInfo as string}
                onChange={(v) => handleChangeFormData("roMoreInfo", v)}
                // onKeyDown={(e) => handleKeyDown(e)}
                theme="snow"
                placeholder="Write your article here..."
              />
            </div>
          </div>
          <Spacer />
          <Button onClick={handleSubmit}>Save</Button>
        </WidgetCard>
      </GridContainer>
    </Layout>
  );
}

export default SingleProductPage;
