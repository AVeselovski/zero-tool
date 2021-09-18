import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useStore } from "../../utils/store";

function Header() {
  const { state, dispatch } = useStore();
  const router = useRouter();

  const _setProject = (value) => {
    dispatch({
      type: "SET_ACTIVE_PROJECT",
      activeProject: value,
    });
    router.push(`/projects/${value}`);
  };

  return (
    <header className="app-header">
      <div className="app-header-left">
        <button className="button icon round big app-header-handle">
          <ion-icon name="menu"></ion-icon>
        </button>
        <h1 className="app-header-brand">
          <Link href="/">Zero Tool</Link>
        </h1>
        {/* 
        <h2 className="app-header-sub-brand">
          <Link href="/events">Events</Link>
        </h2> 
        */}
        <div className="app-header-actions">
          <select
            onChange={(e) => _setProject(e.target.value)}
            value={state.activeProject}
          >
            <option disabled key="empty" value="">
              Select...
            </option>
            {state.projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>
          <button className="button icon big ml-1/4">
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
        {/* 
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
        */}
        <div className="app-header-actions">
          <button className="button icon round giant naked ml-1">
            <ion-icon name="person-circle-outline"></ion-icon>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
