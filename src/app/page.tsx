import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import FeaturedCollection from "@/components/FeaturedCollection";
import { getProducts } from "@/lib/products";

export default function HomePage() {
  const products = getProducts();
  const featuredProduct = products[0] ?? null;
  const newArrivals = products.slice(0, Math.min(products.length, 4));

  return (
    <>
      <Hero />

      <ProductGrid
        id="products"
        title="The Collection"
        subtitle="Editorial pieces designed for presence. Each silhouette embodies minimal luxury with maximum impact."
        products={products}
      />

      {featuredProduct && <FeaturedCollection product={featuredProduct} />}

      {newArrivals.length > 0 && (
        <ProductGrid
          id="new-arrivals"
          title="New Arrivals"
          subtitle="The latest drops from Dark Angel — refined streetwear for the modern muse."
          products={newArrivals}
          masonry={false}
        />
      )}
    </>
  );
}
