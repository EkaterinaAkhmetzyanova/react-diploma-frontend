import Logo from "./Logo";
import Menu from "./Menu";
import SearchForm from "./SearchForm";
import SearchControl from "./SearchControl";
import CartControl from "./CartControl";

export default function Header() {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Logo />
            <div className="collapase navbar-collapse" id="navbarMain">
              <Menu />
              <div>
                <div className="header-controls-pics">
                  <SearchControl />
                  <CartControl />
                </div>
                <SearchForm />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
