import Product from "@/components/product";

import { getProductsByCategory } from "@/server/db/products";
import React from "react";

async function productPage() {
  const categorites = await getProductsByCategory();
  return (
    <main>
      {categorites.map((category) => (
        <section key={category.id} className="section-gap">
          <div className="container text-center">
            <h1 className="text-primary font-bold text-4xl italic mb-6">
              {category.name}
            </h1>
            <Product items={category.products} />
          </div>
        </section>
      ))}
    </main>
  );
}

export default productPage;
