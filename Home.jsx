import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://strapi-store-server.onrender.com/api/products?featured=true');
        const data = await response.json();
        setProducts(data.data); 
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container mx-auto py-20 max-w-[1024px]">
      <div className='hero flex justify-between gap-24'>
        <div className="info w-1/2">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl mb-10">
            We are changing <br /> the way people <br /> shop
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.
          </p>
          <button className="btn btn-primary">OUR PRODUCTS</button>
        </div>
        <div className="carousel flex justify-end">
          <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                className="rounded-box" />
            </div>
          </div>
        </div>
      </div>

      <div className="feature">
        <div className="border-b border-base-300 pb-5 mt-12">
          <h2 className="text-3xl font-medium tracking-wider capitalize">featured products</h2>
        </div>
        <ul className="mt-4 flex flex-wrap gap-8">
          {products.length > 0 ? (
            products.map(product => (
              <li
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="card w-full shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer"
              >
                <img
                  src={product.attributes.image} 
                  alt={product.attributes.title} 
                  className="rounded-xl h-64 md:h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{product.attributes.title}</h2>
                  <span className="text-gray-600">${product.attributes.price}</span>
                </div>
              </li>
            ))
          ) : (
            <span className="loading loading-ring loading-lg flex"></span>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Home;
