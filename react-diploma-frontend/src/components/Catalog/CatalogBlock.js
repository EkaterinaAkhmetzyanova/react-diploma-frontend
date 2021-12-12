export default function CatalogBlock(props) {
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {props.children}
    </section>
  );
}
