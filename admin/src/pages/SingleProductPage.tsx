import { Layout } from '../components/Layout/Layout';
import { GridContainer } from '../components/Grid/GridContainer';
import Spacer from '../components/ui/Spacer';
import { WidgetCard } from '../components/ui/WidgetCard';
import { Input } from '../components/ui/Input/Input';
import { Button } from '../components/ui/Button/Button';
import React from 'react';
import { EditProductSchema, type ProductType } from '../lib/schemas';
import { CATEGORIES, COLORS, SIZES } from '../lib/consts';
import '../components/SingleProductPage/SingleProductPage.scss';
import toast from 'react-hot-toast';
import { PreviewProductDetails } from '../components/SingleProductPage/PreviewProductDetails';
import { ProductPerformanceChart } from '../components/SingleProductPage/ProductPerformanceChart';
import { apiFactory } from '../lib/apiFactory';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/config';
import { useLocation } from 'react-router-dom';
import {
  initialErrorsObject,
  initialFormData,
} from '../components/SingleProductPage/initialData';
import { IconX } from '@tabler/icons-react';

function SingleProductPage() {
  const { pathname } = useLocation();
  const userData = useSelector((state: RootState) => state.user.userData);

  const sessionToken = userData?.token || '';

  const [formData, setFormData] = React.useState<ProductType>(initialFormData);

  const [formDataErrors, setFormDataErrors] = React.useState<{
    [key: string]: string;
  }>(initialErrorsObject);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiFactory().getProduct({
          productId: pathname.split('/')[2],
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
        image: '',
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
      };
      setFormDataErrors(initialErrorsObject);

      // TODO: send data to backend

      try {
        toast.loading('Saving...', {
          id: 'savingToastId',
        });
        const response = await apiFactory().editProduct({
          productData: bodyData,
          productId: pathname.split('/')[2],
          token: sessionToken,
        });
        if (response.error) {
          toast.error(response.error);
          return;
        }
        toast.success('Product was edited successfully');
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        toast.dismiss('savingToastId');
      }
    }
  }
  return (
    <Layout>
      <GridContainer fluid>
        <h1>Product</h1>
        <Spacer size={24} />

        <div className='grid-container-2-equal'>
          {/* SALES PERFORMANCE CHART */}
          <WidgetCard>
            <ProductPerformanceChart />
          </WidgetCard>

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

          <div className='grid-container-2-equal'>
            <Input
              label='En Title'
              placeholder='Enter en title'
              error={formDataErrors.enTitle}
              value={formData.enTitle}
              onChange={(v) => handleChangeFormData('enTitle', v)}
              type={'text'}
            />
            <Input
              label='Ro Title'
              placeholder='Enter ro title'
              error={formDataErrors.roTitle}
              value={formData.roTitle}
              onChange={(v) => handleChangeFormData('roTitle', v)}
              type={'text'}
            />
            <Input
              label='En Description'
              placeholder='Enter en description'
              error={formDataErrors.enDescription}
              value={formData.enDescription}
              onChange={(v) => handleChangeFormData('enDescription', v)}
              type={'textarea'}
            />
            <Input
              label='Ro Description'
              placeholder='Enter ro description'
              error={formDataErrors.roDescription}
              value={formData.roDescription}
              onChange={(v) => handleChangeFormData('roDescription', v)}
              type={'textarea'}
            />
          </div>
          <Spacer />
          <div className='grid-container-2-equal'>
            <Input
              label='Price'
              placeholder='Enter product price'
              error={formDataErrors.price}
              value={formData.price}
              onChange={(v) => handleChangeFormData('price', v)}
              type={'number'}
            />

            <Input
              label='Quantity'
              placeholder='Enter product quantity'
              error={formDataErrors.quantity}
              value={formData?.quantity as string}
              onChange={(v) => handleChangeFormData('quantity', v)}
              type={'number'}
            />

            {/* SINGLE IMAGE COVER */}
            <div className='select-single-image-container'>
              <div className='flex-column-gap-12'>
                <label htmlFor='image'>
                  <b>Cover Image</b>
                </label>
                <input type='file' id='image' onChange={handleImageChange} />
                <p className='text-error'>{formDataErrors.image}</p>
              </div>

              {formData.image && (
                <div className='flex-column-gap-12'>
                  <p>
                    <b>Preview image</b>
                  </p>
                  <Spacer size={8} />
                  {formData.image && (
                    <>
                      <IconX
                        cursor={'pointer'}
                        onClick={handleDeleteCoverImage}
                      />
                      <img
                        src={formData.image}
                        alt={'cover-image'}
                        style={{
                          width: 200,
                          height: 150,
                          objectFit: 'contain',
                        }}
                      />
                    </>
                  )}
                  <Spacer />
                </div>
              )}
            </div>
            {/* <Spacer /> */}

            {/*MULTIPLE IMAGES WITH COLORS */}
            <div className='select-mltiple-images-container'>
              <div>
                <div>
                  <div>
                    <label htmlFor='image'>
                      <b>Product Images</b>
                    </label>
                    <Spacer size={8} />
                    <input
                      type='file'
                      id='images'
                      onChange={handleMultipleImageChange}
                    />
                    <p className='text-error'>{formDataErrors.images}</p>
                  </div>
                </div>

                <div>
                  <Spacer size={8} />
                  <p>
                    <b>Image color</b>
                  </p>
                  <Spacer size={8} />
                  <select
                    className='select'
                    onChange={(e) => {
                      const selecteOptionsArray = Array.from(
                        e.target.selectedOptions
                      ).map((option) => option.value);

                      handleChangeFormData(
                        'imageColor',
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
                  <p className='text-error'> {formDataErrors.imageColor}</p>
                </div>
              </div>
              {formData.images && (
                <div className='flex-column-gap-12'>
                  <p>
                    <b>Preview images</b>
                  </p>
                  {formData.images.map((item) => {
                    return (
                      <div
                        key={item.colorName + item.image}
                        className='flex-center-row-4'
                      >
                        <IconX
                          cursor={'pointer'}
                          onClick={() => handleDeleteProductImage(item.image)}
                        />
                        {item.image && (
                          <img
                            src={item.image}
                            alt={'cover-image'}
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: 'contain',
                            }}
                          />
                        )}
                        <p>{item.colorName}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <Spacer />

          <div className='grid-container-2-equal'>
            <div className='flex-column-gap-12'>
              <div className='flex-column'>
                <p>Category</p>
                <Spacer size={8} />
                <select
                  value={formData.categories[0]}
                  className='select'
                  onChange={(e) =>
                    handleChangeFormData('categories', [e.target.value])
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
                <p className='text-error'>{formDataErrors.categories}</p>
              </div>

              <div>
                <Spacer size={8} />
                <p>Sizes</p>
                <Spacer size={8} />
                <select
                  value={formData.size.map((item) => item)}
                  multiple
                  className='select'
                  onChange={(e) => {
                    const selectedOptionsArray = Array.from(
                      e.target.selectedOptions
                    ).map((option) => option.value);
                    handleChangeFormData('size', selectedOptionsArray);
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
                <p className='text-error'> {formDataErrors.size}</p>
              </div>
            </div>

            <div className='flex-column-gap-12'>
              <div className='flex-center-row-8'>
                <label htmlFor='isPublished'>Published</label>
                <input
                  checked={formData.isPublished}
                  type='checkbox'
                  id='isPublished'
                  onChange={(e) =>
                    handleChangeFormData('isPublished', e.target.checked)
                  }
                />
                <p className='text-error'>{formDataErrors.isPublished}</p>
              </div>

              <div className='flex-center-row-8'>
                <label htmlFor='inStock'>In Stock</label>
                <input
                  checked={formData.inStock}
                  type='checkbox'
                  id='inStock'
                  onChange={(e) =>
                    handleChangeFormData('inStock', e.target.checked)
                  }
                />
                <p className='text-error'>{formDataErrors.inStock}</p>
              </div>
              <Spacer size={12} />
              <div className='flex-center-row-8'>
                <label htmlFor='featured'>Featured</label>
                <input
                  checked={formData.featured}
                  type='checkbox'
                  id='featured'
                  onChange={(e) =>
                    handleChangeFormData('featured', e.target.checked)
                  }
                />
                <p className='text-error'>{formDataErrors.featured}</p>
              </div>

              <div className='flex-column'>
                <label htmlFor='featuredBackgroundColor'>
                  Featured Background Color
                </label>
                <Spacer size={8} />
                <input
                  value={formData.featuredBackgroundColor}
                  type='color'
                  id='featuredBackgroundColor'
                  onChange={(e) =>
                    handleChangeFormData(
                      'featuredBackgroundColor',
                      e.target.value
                    )
                  }
                />
                <p className='text-error'>
                  {formDataErrors.featuredBackgroundColor}
                </p>
              </div>
            </div>

            <Input
              label='More info'
              placeholder='Enter product info'
              error={formDataErrors.moreInfo}
              value={formData?.moreInfo as string}
              onChange={(v) => handleChangeFormData('moreInfo', v)}
              type={'textarea'}
            />
          </div>
          <Spacer />
          <Button onClick={handleSubmit}>Save</Button>
        </WidgetCard>
      </GridContainer>
    </Layout>
  );
}

export default SingleProductPage;
