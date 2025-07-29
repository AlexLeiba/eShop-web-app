import React, { useEffect } from 'react';
import { Container } from '../components/Grid/Container';
import { Newsletter } from '../components/Home/Newsletter';
import AddAmount from '../components/Products/AddAmount';
import Colors from '../components/Products/Colors';
import { Announcement } from '../components/ui/Announcement';
import { Button } from '../components/ui/Button';
import { Spacer } from '../components/ui/spacer';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { SizeSelector } from '../components/Products/SizeSelector';
import type { ProductsType } from '../consts';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconChevronLeft,
  IconHeart,
  IconHeartFilled,
  IconShoppingCart,
  IconShoppingCartFilled,
} from '@tabler/icons-react';
import { Loader } from '../components/ui/Loader';
import type { RootState } from '../store/store';
import { updateWishlist } from '../store/wishList/apiCalls';
import { updateCart } from '../store/cart/apiCalls';
import { useTranslation } from 'react-i18next';
import { Layout } from '../components/Layout/Layout';

function Product() {
  const { t } = useTranslation('translation', { keyPrefix: 'ProductPage' });
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.user.userData?.data);
  const sessionToken = userData?.token || '';

  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const [loading, setLoading] = React.useState(true);

  const [itemFeatures, setItemFeatures] = React.useState({
    color: '',
    size: '',
    quantity: 1,
  });

  const [product, setProduct] = React.useState<ProductsType>(
    {} as ProductsType
  );

  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isInCart, setIsInCart] = React.useState(false);

  useEffect(() => {
    const language = localStorage.getItem('language');
    async function fetchData() {
      try {
        setLoading(true);
        // PRODUCT ELEMENT
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products/${productId}?language=${language?.toLowerCase()}`
        );
        const responseProduct: { data: ProductsType } = await response.json();
        if (responseProduct.data) {
          setProduct(responseProduct.data);
          setItemFeatures({
            color:
              responseProduct.data.color.length === 1
                ? responseProduct.data.color[0]
                : '',
            size:
              responseProduct.data.size.length === 1
                ? responseProduct.data.size[0]
                : '',
            quantity: 1,
          });
        }

        if (sessionToken) {
          //  CART ELEMENT
          const responseCart = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            {
              headers: {
                token: `Bearer ${sessionToken}`,
              },
            }
          );
          const responseCartData = await responseCart.json();

          const isProductInCart = responseCartData?.data?.products?.find(
            (item: ProductsType) => item._id === productId
          );
          if (isProductInCart) {
            setIsInCart(true);
          }
          // WISH LIST ELEMENT
          const responseWishList = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/wishlist`,
            {
              headers: {
                token: `Bearer ${sessionToken}`,
              },
            }
          );
          const responseWishListData = await responseWishList.json();

          const isProductInWishList = responseWishListData?.data?.find(
            (item: ProductsType) => item._id === productId
          );
          if (isProductInWishList) {
            setIsFavorite(true);
          }
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [location.pathname]);

  async function handleAddToCart(product: ProductsType) {
    if (
      (!itemFeatures.size || itemFeatures.size === 'Selectsize') &&
      !itemFeatures.color
    ) {
      toast.error(t('toasts.selectSizeAndColor'));
      return;
    } else if (!itemFeatures.size || itemFeatures.size === 'Selectsize') {
      toast.error(t('toasts.selectSize'));
      return;
    } else if (!itemFeatures.color) {
      return toast.error(t('toasts.selectColor'));
    }

    const response = await updateCart({
      dispatch,
      product: {
        ...product,
        color: itemFeatures.color,
        size: itemFeatures.size,
        quantity: itemFeatures.quantity,
        categories: product.categories[0], // Use the first category as a string
        productId: product._id,
      },
      token: sessionToken,
    });
    if (response?.error) {
      toast.error(response.error);
    }
    if (response?.data) {
      toast.success(t('toasts.addedToCart'));
      setIsInCart(true);
    }
  }

  async function handleAddToWishList(product: ProductsType) {
    const response = await updateWishlist({
      dispatch,
      product: product,
      token: sessionToken,
    });

    if (response?.error) {
      toast.error(response.error);
    }
    if (response?.data) {
      toast.success(t('toasts.addedToWishlist'));
      setIsFavorite(true);
    }
  }

  function showSelectedImageColor() {
    return product.images.filter(
      (item) => item.colorName === itemFeatures.color
    )[0].image;
  }

  return (
    <Layout>
      <Announcement
        title='lorem20 is coming soon dsdsadsa sdadsa dsadsad'
        link='google.com'
        linkTitle='Read More'
      />

      <Spacer size={24} />

      <Loader loading={loading} className='h-[616px]'>
        <Container>
          <div
            onClick={() => window.history.back()}
            className='flex items-center  cursor-pointer shadow-md rounded-full p-2 w-fit hover:shadow-gray-400 transition-all'
            title='Go back'
          >
            <IconChevronLeft />
          </div>
        </Container>
        <Spacer sm={12} md={24} lg={24} />
        <Container>
          <div className='grid lg:grid-cols-2 grid-cols-1 gap-8 '>
            {/* IMG */}
            <img
              src={
                !itemFeatures.color ? product.image : showSelectedImageColor()
              }
              alt={product.title}
            />

            {/* Details */}

            <div>
              <h3 className='text-4xl '>{product.title}</h3>
              <Spacer size={4} />
              <p>{product.description}</p>

              <Spacer size={4} />
              <p className='text-3xl'>${product.price}</p>
              <Spacer size={12} />
              <div className='flex items-center gap-2'>
                <p className='text-xl'>{t('color')}</p>
                <Colors
                  selectedColor={itemFeatures.color}
                  setColor={setItemFeatures}
                  colors={product.color}
                />
              </div>
              <Spacer size={6} />
              <div className='flex items-center gap-2'>
                <p className='text-xl'>{t('size')}</p>
                <SizeSelector
                  setSize={setItemFeatures}
                  size={itemFeatures.size}
                  type='size'
                  data={product.size}
                />
              </div>
              <Spacer size={6} />

              <div className='flex items-center gap-2'>
                <AddAmount
                  type='productPage'
                  setProductData={setItemFeatures}
                  productData={itemFeatures}
                />
              </div>
              <Spacer size={6} />
              <Button
                onClick={() => handleAddToCart(product)}
                disabled={!sessionToken}
              >
                {isInCart ? (
                  <>
                    {t('addedToCart')}
                    <IconShoppingCartFilled className='ml-2 text-green-500' />
                  </>
                ) : (
                  <>
                    {t('addToCartButton')}
                    <IconShoppingCart className='ml-2' />
                  </>
                )}
              </Button>
              <Spacer size={6} />
              <Button
                disabled={isFavorite || !sessionToken}
                variant='secondary'
                onClick={() => handleAddToWishList(product)}
              >
                {isFavorite ? (
                  <>
                    {t('addedToWishlist')}
                    <IconHeartFilled className='ml-2 text-red-500' />
                  </>
                ) : (
                  <>
                    {t('addToWishlistButton')}
                    <IconHeart className='ml-2' />
                  </>
                )}
              </Button>
              <Spacer size={6} />
            </div>
          </div>
        </Container>
      </Loader>
      <Spacer sm={16} md={24} lg={24} />

      {/* Newsletter */}
      <Container fluid className='bg-gray-100 '>
        <Newsletter />
      </Container>
    </Layout>
  );
}

export default Product;
