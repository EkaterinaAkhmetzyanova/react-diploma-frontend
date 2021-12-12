import ProductCard from "../components/Products/ProductCard";

export default function ProductPage({ match }) {
  return <ProductCard id={Number(match.params.id)} />;
}
