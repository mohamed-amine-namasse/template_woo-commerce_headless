import "./index.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProductsThunk } from "../../thunkActionsCreator/productsThunks";
import { addProductToCart } from "../../thunkActionsCreator/cartThunks";

export default function HomeSlider() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.products);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(
      fetchProductsThunk({
        orderby: "popularity",
        order: "desc",
        page: 1,
        per_page: 15,
      }),
    );
  }, [dispatch]);

  const products = list?.data || [];

  const goNext = () => {
    setCurrentIndex((i) => (i + 1) % products.length);
  };
  const goPrev = () => {
    setCurrentIndex((i) => (i - 1 + products.length) % products.length);
  };

  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(goNext, 4000);
    return () => clearInterval(interval);
  }, [products.length]);

  const addProduct = (productId) => {
    dispatch(addProductToCart({ productId, quantity: 1, variation: [] }));
  };

  if (loading) return <p>Chargement...</p>;
  if (products.length === 0) return null;

  const product = products[currentIndex];

  return (
    <div className="home-slider">
      <h2>Produits du moment</h2>

      <button onClick={goPrev}>{"<"}</button>

      <div className="home-slider-product">
        <img src={product.images[0]?.src} alt={product.name} />
        <p dangerouslySetInnerHTML={{ __html: product.name }}></p>
        <p dangerouslySetInnerHTML={{ __html: product.price_html }}></p>
        <button onClick={() => addProduct(product.id)}>
          Ajouter au panier
        </button>
      </div>

      <button onClick={goNext}>{">"}</button>
    </div>
  );
}
