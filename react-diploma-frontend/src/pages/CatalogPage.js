import CatalogBlock from "../components/Catalog/CatalogBlock";
import CatalogCategories from "../components/Catalog/CatalogCategories";
import Catalog from "../components/Catalog/Catalog";
import CatalogSearch from "../components/Catalog/CatalogSearch";

export default function CatalogPage() {
  return (
    <CatalogBlock>
      <CatalogSearch />
      <CatalogCategories />
      <Catalog />
    </CatalogBlock>
  );
}
