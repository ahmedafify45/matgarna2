import { getCurrentLocale } from "@/lib/getCurrentLocale";

import { ProductWithRelations } from "@/types/product";
import getTrans from "@/lib/translation";
import ProductItem from "./ProductItem";

async function Product({ items }: { items: ProductWithRelations[] }) {
  const locale = await getCurrentLocale();
  const { noProductsFound } = await getTrans(locale);
  return items.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </ul>
  ) : (
    <p className="text-accent text-center">{noProductsFound}</p>
  );
}

export default Product;
