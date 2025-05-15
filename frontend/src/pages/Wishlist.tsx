import { Link } from 'react-router-dom';
import { Container } from '../components/Grid/Container';
import { Newsletter } from '../components/Home/Newsletter';
import { Footer } from '../components/Navigations/Footer';
import { Navbar } from '../components/Navigations/Navbar';
import { Announcement } from '../components/ui/Announcement';
import { Button } from '../components/ui/Button';
import { Spacer } from '../components/ui/spacer';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { WishListCard } from '../components/WishList/WishListCard';
import { IconHeart } from '@tabler/icons-react';
import { clearWishList } from '../store/wishList/reducer';

function Wishlist() {
  const dispatch = useDispatch();
  const { wishList: wishListData } = useSelector((state: RootState) => state);
  function handleClearList() {
    dispatch(clearWishList());
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

      <Spacer sm={16} md={24} lg={24} />

      <div className=''>
        <Container>
          <div className='flex gap-2 justify-center items-center'>
            <h1 className='text-4xl font-medium text-center'>Wish List</h1>
            <IconHeart size={32} />
          </div>
          <div className=''>
            <div className='grid span-2 '>
              <Spacer size={8} />
              {wishListData.length > 0 && (
                <div className='flex justify-between'>
                  <Link to='/products' className='w-[250px]' type='secondary'>
                    <Button className='w-[250px]' variant='secondary'>
                      Continue shopping
                    </Button>
                  </Link>

                  <Button onClick={handleClearList} className='w-[100px]'>
                    Clear list
                  </Button>
                </div>
              )}

              <Spacer size={8} />

              {/* Cart products List */}
              <div className='flex gap-8 flex-col'>
                {wishListData.map((item) => {
                  return (
                    <div key={item._id}>
                      <WishListCard type='wishList' data={item} />
                    </div>
                  );
                })}
                {wishListData.length === 0 && (
                  <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-2xl font-bold'>
                      Your wish list is empty
                    </h2>
                    <Link
                      to='/products?sort=newest&page=1'
                      className='w-[250px]'
                    >
                      <Spacer size={4} />
                      <Button className='w-[250px]' variant='secondary'>
                        Continue shopping
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
        <Spacer sm={16} md={24} lg={24} />

        {/* Newsletter */}
        <Container fluid className='bg-gray-100 '>
          <Newsletter />
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Wishlist;
