import React, { useEffect } from 'react';
import { Container } from '../components/Grid/Container';
import { Newsletter } from '../components/Home/Newsletter';
import { Footer } from '../components/Navigations/Footer';
import { Navbar } from '../components/Navigations/Navbar';
import AddAmount from '../components/Products/AddAmount';
import Colors from '../components/Products/Colors';
import { Announcement } from '../components/ui/Announcement';
import { Button } from '../components/ui/Button';
import { Spacer } from '../components/ui/spacer';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { SizeSelector } from '../components/Products/SizeSelector';
import type { ProductsType } from '../consts';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cart/reducer';
import { addToWithList } from '../store/wishList/reducer';
import {
  IconHeart,
  IconHeartFilled,
  IconShoppingCart,
  IconShoppingCartFilled,
} from '@tabler/icons-react';

function Product() {
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split('/')[2];

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
    async function fetchData() {
      toast.loading('Loading product...');
      try {
        // PRODUCT ELEMENT
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`
        );
        const responseProduct: { data: ProductsType } = await response.json();
        if (response.ok) {
          setProduct(responseProduct.data);
        }

        //  CART ELEMENT
        const responseCart = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart`
        );
        const responseCartData = await responseCart.json();
        const isProductInCart = responseCartData.products.find(
          (item: ProductsType) => item._id === productId
        );
        if (isProductInCart) {
          setIsInCart(true);
        }
        // WISH LIST ELEMENT
        const responseWishList = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/wishlist`
        );
        const responseWishListData = await responseWishList.json();
        const isProductInWishList = responseWishListData.products.find(
          (item: ProductsType) => item._id === productId
        );
        if (isProductInWishList) {
          setIsFavorite(true);
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        toast.dismiss();
      }
    }

    fetchData();
  }, []);

  function handleAddToCart() {
    if (
      (!itemFeatures.size || itemFeatures.size === 'Selectsize') &&
      !itemFeatures.color
    ) {
      toast.error('Please select size and color');
      return;
    } else if (!itemFeatures.size || itemFeatures.size === 'Selectsize') {
      toast.error('Please select size');
      return;
    } else if (!itemFeatures.color) {
      return toast.error('Please select color');
    }

    dispatch(addToCart({ ...product, ...itemFeatures }));
    toast.success('Product added to cart');

    // add to cart API
  }

  function handleAddToWishList() {
    dispatch(addToWithList(product));
    toast.success('Product added to wishlist');
  }

  return (
    <div className='flex min-h-screen flex-col'>
      {/* Navbar */}
      <Navbar />
      <Announcement
        title='lorem20 is coming soon dsdsadsa sdadsa dsadsad'
        link='google.com'
        linkTitle='Read More'
      />

      <Spacer sm={24} md={48} lg={48} />

      <Container>
        <div className='grid grid-cols-2 gap-8 '>
          {/* IMG */}
          <img src={product.image} alt={product.title} />

          {/* Details */}

          <div>
            <h3 className='text-4xl '>{product.title}</h3>
            <Spacer size={4} />
            <p>{product.description}</p>

            <Spacer size={4} />
            <p className='text-3xl'>${product.price}</p>
            <Spacer size={12} />
            <div className='flex items-center gap-2'>
              <p className='text-xl'>Color</p>
              <Colors
                selectedColor={itemFeatures.color}
                setColor={setItemFeatures}
                colors={product.color}
              />
            </div>
            <Spacer size={6} />
            <div className='flex items-center gap-2'>
              <p className='text-xl'>Size</p>
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
                setAmount={setItemFeatures}
                amount={itemFeatures.quantity}
              />
            </div>
            <Spacer size={6} />
            <Button onClick={handleAddToCart}>
              Add to cart{' '}
              {isInCart ? (
                <IconShoppingCartFilled className='ml-2 text-green-500' />
              ) : (
                <IconShoppingCart className='ml-2' />
              )}
            </Button>
            <Spacer size={6} />
            <Button
              disabled={isFavorite}
              variant='secondary'
              onClick={handleAddToWishList}
            >
              Add to wishlist{' '}
              {isFavorite ? (
                <IconHeartFilled className='ml-2 text-red-500' />
              ) : (
                <IconHeart className='ml-2' />
              )}
            </Button>
            <Spacer size={6} />
          </div>
        </div>
      </Container>
      <Spacer sm={16} md={24} lg={24} />

      {/* Newsletter */}
      <Container fluid className='bg-gray-100 '>
        <Newsletter />
      </Container>

      <Footer />
    </div>
  );
}

export default Product;
