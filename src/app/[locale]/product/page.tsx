import Product from "@/components/product";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";

import { getProductsByCategory } from "@/server/db/products";
import React from "react";

async function productPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const translations = await getTrans(locale);
  const categorites = await getProductsByCategory();
  return (
    <main>
      {categorites.length > 0 ? (
        categorites.map((category) => (
          <section key={category.id} className="section-gap">
            <div className="container text-center">
              <h1 className="text-primary font-bold text-4xl italic mb-6">
                {category.name}
              </h1>
              <Product items={category.products} />
            </div>
          </section>
        ))
      ) : (
        <p className="text-accent text-center py-20">
          {translations.noProductsFound}
        </p>
      )}
    </main>
  );
}

export default productPage;
