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

const initialErrorsObject = {
  roTitle: '',
  enTitle: '',

  roDescription: '',
  enDescription: '',

  price: '',
  image: '',
  categories: '',
  size: '',
  color: '',

  images: '',
  imageColor: '',

  isPublished: '',
  inStock: '',
  featured: '',
  featuredBackgroundColor: '',
  language: '',
  quantity: '',
  moreInfo: '',
};

const initialFormData = {
  roTitle: 'sasaas',
  enTitle: 'asasas',

  roDescription: 'dsds',
  enDescription: 'dsds',

  price: '123',
  image: '',
  categories: ['shirts'],
  size: ['xs', 's', 'xl'],
  color: ['black'],

  images: [],
  imageColor: 'white',

  isPublished: true,
  inStock: true,
  featured: true,
  featuredBackgroundColor: '#ffffff',
  language: 'en',
  quantity: '1',
  moreInfo: '',
};
function SingleProductPage() {
  const [formData, setFormData] = React.useState<ProductType>(initialFormData);

  const [formDataErrors, setFormDataErrors] = React.useState<{
    [key: string]: string;
  }>(initialErrorsObject);

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

  function handleSubmit() {
    console.log('🚀 ~ handleSubmit ~ formData:', formData);
    const validatedFormData = EditProductSchema.safeParse(formData);

    if (!validatedFormData.success) {
      const errorValues: { [key: string]: string } = {};
      console.log(
        '🚀 ~ handleSubmit ~ validatedFormData:',
        validatedFormData.error.issues
      );

      validatedFormData.error.issues.forEach((issue) => {
        errorValues[issue.path[0]] = issue.message;
      });

      setFormDataErrors(errorValues);
    }

    console.log(validatedFormData.data);
  }
  return (
    <Layout>
      <GridContainer fluid>
        <h1>Product</h1>
        <Spacer size={24} />

        <div className='grid-container-2-equal'>
          {/* SALES PERFORMANCE CHART */}
          <WidgetCard>
            <h4>Chart</h4>
          </WidgetCard>

          {/* PREVIEW PRODUCT DETAILS */}
          <WidgetCard>
            <h4>Product details</h4>
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
                <label htmlFor='image'>Cover Image</label>
                <input type='file' id='image' onChange={handleImageChange} />
                <p className='text-error'>{formDataErrors.image}</p>
              </div>

              {formData.image && (
                <div className='flex-column-gap-12'>
                  <p>Preview image</p>
                  <img
                    src={formData.image}
                    alt={'cover-image'}
                    style={{ width: 200, height: 100, objectFit: 'contain' }}
                  />
                  <Spacer />
                </div>
              )}
            </div>
            {/* <Spacer /> */}

            {/* IMAGES */}
            <div className='select-mltiple-images-container'>
              <div>
                <div>
                  <div>
                    <label htmlFor='image'>Product Images</label>
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
                  <p>Image color</p>
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
                  <p>Preview images</p>
                  {formData.images.map((item) => {
                    return (
                      <div key={item.colorName + item.image}>
                        <img
                          src={item.image}
                          alt={'cover-image'}
                          style={{
                            width: 200,
                            height: 100,
                            objectFit: 'contain',
                          }}
                        />
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
                    handleChangeFormData('categories', e.target.value)
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

              <div className='flex-column'>
                <Spacer size={8} />
                <p>Colors</p>
                <Spacer size={8} />
                <select
                  value={formData.color.map((item) => item)}
                  multiple
                  className='select'
                  onChange={(e) => {
                    const selecteOptionsArray = Array.from(
                      e.target.selectedOptions
                    ).map((option) => option.value);

                    handleChangeFormData('color', selecteOptionsArray);
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
                <p className='text-error'> {formDataErrors.color}</p>
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
                    handleChangeFormData('color', e.target.value)
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
