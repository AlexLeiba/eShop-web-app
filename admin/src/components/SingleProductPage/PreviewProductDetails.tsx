import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";
import type { ProductType } from "../../lib/schemas";
import Spacer from "../ui/Spacer";
import DOMPurify from "dompurify";

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
          </h4>
          <p>{formData.enTitle}</p>
          <h4>
            <b>Description:</b>
          </h4>
          <p>{formData.enDescription}</p>
          <h4 className="text-3xl">
            <b>Price: </b>
          </h4>
          <p> {formData.price}</p>
          <div className="sizes-wrapper">
            <h4 className="text-3xl">
              <b>Sizes:</b>
            </h4>
            {formData.size.map((item) => {
              return <p key={item}>{item}</p>;
            })}
          </div>
          <div className="colors-wrapper">
            <h4>
              <b>Colors:</b>
            </h4>
            {formData.color.map((item, index) => {
              return (
                <div
                  key={item + index}
                  style={{ backgroundColor: item, border: "1px solid black" }}
                ></div>
              );
            })}
          </div>

          <h4>Quantity:</h4>
          <p>{formData.quantity}</p>
          <div>
            <h4>Published:</h4>
            <p className="flex-center-row-4">
              {formData.isPublished ? (
                <IconCircleCheck color="green" />
              ) : (
                <IconCircleX color="red" />
              )}
            </p>
          </div>

          <h4>
            <b>In Stock:</b>
            {formData.inStock ? (
              <span style={{ color: "green" }}>Yes</span>
            ) : (
              <span style={{ color: "red" }}>No</span>
            )}
          </h4>
          <h4>Featured:</h4>
          <p>
            {formData.featured ? (
              <span style={{ color: "green" }}>Yes</span>
            ) : (
              <span style={{ color: "red" }}>No</span>
            )}
          </p>
          {formData.featured && (
            <div>
              <h4>
                <b>Featured Color:</b>
              </h4>
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
            <>
              <h4>
                <b>More info:</b>
              </h4>

              <div
                dangerouslySetInnerHTML={{
                  __html:
                    DOMPurify.sanitize(formData.moreInfo).substring(0, 500) +
                    ".....",
                }}
              />
            </>
          )}
        </div>
        {formData.image && <img src={formData.image} alt={formData.title} />}
      </div>
      <Spacer size={24} />
    </div>
  );
}
