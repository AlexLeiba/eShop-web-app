import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";
import type { ProductType } from "../../lib/schemas";
import Spacer from "../ui/Spacer";

type Props = {
  formData: ProductType;
};
export function PreviewProductDetails({ formData }: Props) {
  return (
    <div>
      <h3>Preview product details</h3>
      <Spacer />
      <div className="product-details-wrapper">
        <div className="details">
          <h4>
            <b>Title:</b>
            {formData.enTitle}
          </h4>
          <p>
            <b>Description:</b>
            {formData.enDescription}
          </p>
          <p className="text-3xl">
            <b>Price: </b> ${formData.price}
          </p>
          <div className="sizes-wrapper">
            <p className="text-3xl">
              <b>Sizes:</b>
            </p>
            {formData.size.map((item) => {
              return <p key={item}>{item}</p>;
            })}
          </div>
          <div className="colors-wrapper">
            <p>
              <b>Colors:</b>
            </p>
            {formData.color.map((item, index) => {
              return (
                <div
                  key={item + index}
                  style={{ backgroundColor: item, border: "1px solid black" }}
                ></div>
              );
            })}
          </div>

          <p>
            <b>Quantity:</b>
            {formData.quantity}
          </p>
          <div>
            <p className="flex-center-row-4">
              <b>Published:</b>
              {formData.isPublished ? (
                <IconCircleCheck color="green" />
              ) : (
                <IconCircleX color="red" />
              )}
            </p>
          </div>

          <p>
            <b>In Stock:</b>
            {formData.inStock ? (
              <span style={{ color: "green" }}>Yes</span>
            ) : (
              <span style={{ color: "red" }}>No</span>
            )}
          </p>
          <p>
            <b>Featured:</b>
            {formData.featured ? (
              <span style={{ color: "green" }}>Yes</span>
            ) : (
              <span style={{ color: "red" }}>No</span>
            )}
          </p>
          {formData.featured && (
            <div>
              <p>
                <b>Featured Color:</b>
              </p>
              <div
                style={{
                  backgroundColor: formData.featuredBackgroundColor,
                  width: "200px",
                  height: "20px",
                  border: "1px solid black",
                }}
              ></div>
            </div>
          )}
          {formData.moreInfo && (
            <p>
              <b>More info:</b>
              {formData.moreInfo.substring(0, 100) + "..................."}
            </p>
          )}
        </div>
        {formData.image && <img src={formData.image} alt={formData.title} />}
      </div>
      <Spacer size={24} />
    </div>
  );
}
