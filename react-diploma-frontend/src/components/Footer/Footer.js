import Contacts from "./Contacts";
import Copyright from "./Copyright";
import Information from "./Information";
import Payment from "./Payment";

export default function Footer() {
  return (
    <footer className="container bg-light footer">
      <div className="row">
        <div className="col">
          <Information />
        </div>
        <div className="col">
          <Payment />
          <Copyright />
        </div>
        <div className="col text-right">
          <Contacts />
        </div>
      </div>
    </footer>
  );
}
