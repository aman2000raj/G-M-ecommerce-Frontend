import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <section className='h-screen flex justify-center items-center'>
        Loading...
      </section>
    );
  }
  const { image, description, title, price } = product;

  return (
    <section className='pt-20 pb-12 lg:py-32 flex items-center'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row items-center gap-8'>
          {/* Product Image */}
          <div className='w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0'>
            <img
              className='max-w-[200px] sm:max-w-[300px] lg:max-w-sm w-full'
              src={image}
              alt={title}
            />
          </div>
          
          {/* Product Details */}
          <div className='w-full lg:w-1/2 text-center lg:text-left'>
            <h1 className='text-[24px] sm:text-[26px] font-medium mb-4 mx-auto lg:mx-0'>
              {title}
            </h1>
            <div className='text-xl sm:text-2xl text-red-500 font-medium mb-6'>
              ${parseFloat(price).toFixed(2)}
            </div>
            <p className='text-sm sm:text-base mb-8 max-w-[400px] mx-auto lg:mx-0'>
              {description}
            </p>
            <button
              className='bg-primary text-white py-3 px-6 sm:py-4 sm:px-8 rounded-md hover:bg-primary-dark transition-all duration-200'
              onClick={() => addToCart(product, product.id)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
