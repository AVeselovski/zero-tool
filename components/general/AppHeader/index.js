import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import styles from "./AppHeader.module.css";

import MenuIcon from "@components/icons/MenuIcon";
import SettingsIcon from "@components/icons/SettingsIcon";
import SearchIcon from "@components/icons/SearchIcon";
import UserIcon from "@components/icons/UserIcon";

import {
  setActiveProject,
  selectProjects,
  selectActiveProject,
} from "@features/projects/projectsSlice";

function Header() {
  const activeProject = useSelector(selectActiveProject);
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  const router = useRouter();

  const setProject = (value) => {
    dispatch(setActiveProject(value));
    router.push(`/projects/${value}`);
  };

  return (
    <header className={styles.appHeader}>
      <div className={styles.appHeaderLeft}>
        <button className={`${styles.appHeaderHandle} button icon round p-2`}>
          <MenuIcon />
        </button>
        <h1 className={styles.appHeaderBrand}>
          <Link href="/dashboard">Zero Tool</Link>
        </h1>
        {/* 
        <h2 className="app-header-sub-brand">
          <Link href="/events">Events</Link>
        </h2> 
        */}
        <div className={styles.appHeaderActions}>
          <select
            className="input"
            onChange={(e) => setProject(e.target.value)}
            value={activeProject}
          >
            <option disabled key="empty" value="">
              Select...
            </option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>
          <button className="button icon ml-1">
            <SettingsIcon />
          </button>
          <div className={styles.appHeaderSearch}>
            <input className="input wide" placeholder="Search..." type="text" />
            <button>
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.appHeaderRight}>
        <div className={styles.appHeaderActions}>
          <button className="button icon round ml-1 p-2">
            <UserIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
