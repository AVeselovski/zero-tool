import Link from "next/link";

function Header() {
  return (
    <header className="app-header">
      <div className="app-header-left">
        <button className="button icon round app-header-handle">
          <ion-icon name="menu"></ion-icon>
        </button>
        <h1 className="app-header-brand">
          <Link href="/">Zero Tool</Link>
        </h1>
        <h2 className="app-header-sub-brand">
          <Link href="/events">Events</Link>
        </h2>
        <div className="app-header-actions">
          <select>
            <option>Project X</option>
            <option>Project Y</option>
          </select>
          <button className="button icon ml-1/4">
            <ion-icon name="settings"></ion-icon>
          </button>
          <div className="search-input-group ml-2">
            <input className="wide" placeholder="Search..." type="text" />
            <button>
              <ion-icon name="search-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
      <div className="app-header-right">
        <nav className="app-header-nav">
          <ul>
            <li>
              <Link href="/events">All Events</Link>
            </li>
            <li>
              <Link href="/events/new">Add New Event</Link>
            </li>
          </ul>
        </nav>
        <div className="app-header-actions">
          <button className="button icon round big naked ml-1">
            <ion-icon name="person-circle-outline"></ion-icon>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
