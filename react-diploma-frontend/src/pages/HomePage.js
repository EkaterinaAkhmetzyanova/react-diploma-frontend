import TopSales from "../components/TopSales";
import CatalogBlock from "../components/Catalog/CatalogBlock";
import CatalogCategories from "../components/Catalog/CatalogCategories";
import Catalog from "../components/Catalog/Catalog";

export default function HomePage() {
  return (
    <>
      <TopSales />
      <CatalogBlock>
        <CatalogCategories />
        <Catalog />
      </CatalogBlock>
    </>
  );
}
