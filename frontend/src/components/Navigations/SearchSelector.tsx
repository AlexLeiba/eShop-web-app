import React, { useCallback, useEffect } from 'react';
import { SearchInput } from '../ui/SearchInput';
import { type ProductsType } from '../../consts';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IconLoader } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const initialProductData: ProductsType[] = [];

function SearchSelector() {
  const { t } = useTranslation('translation', { keyPrefix: 'HeaderSection' });
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const [productsData, setProductsData] =
    React.useState<ProductsType[]>(initialProductData);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleSearch = useCallback((searchTerm: string) => {
    setSearch(searchTerm);
  }, []);

  useEffect(() => {
    const language = localStorage.getItem('language') || 'en';
    setLoading(true);
    async function fetchData() {
      if (search !== '') {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/search-products?search=${search}&language=${language?.toLowerCase()}`
          );
          const { data } = await response.json();

          setProductsData(data);
        } catch (error: any) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    }

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    document.addEventListener('click', (e: Event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        if (search) {
          setSearch('');
        }
        if (productsData.length > 0) {
          setProductsData(initialProductData);
        }
      }
    });
  }, [search, productsData]);

  return (
    <div className='relative w-full' ref={containerRef} title='Search Products'>
      <SearchInput
        label={''}
        placeholder={t('searchPlaceholder')}
        value={search}
        onChange={handleSearch}
        error={''}
        type={'text'}
      />

      {search && (
        <div className='absolute top-10 left-0 w-full bg-white shadow-lg rounded-md z-50 px-2 py-4 flex flex-col gap-4'>
          {loading ? (
            <div className='flex items-center justify-center animate-spin'>
              <IconLoader />
            </div>
          ) : productsData && productsData.length > 0 ? (
            productsData.map((item) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/product/${item._id}`);
                    setSearch('');
                  }}
                  key={item._id + item.title}
                  className='hover:text-white gap-4  px-2 relative rounded-sm w-full h-12 flex items-center hover:bg-gray-400 transition-all cursor-pointer'
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className='w-10 h-10 object-contain'
                  />
                  <p>{item.title}</p>
                </div>
              );
            })
          ) : (
            <p>{t('noProductsFound')}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchSelector;
