import Link from "next/link";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { useUi } from "app/ui-store";

import styles from "./AppHeader.module.css";
import MenuIcon from "components/icons/MenuIcon";
import SettingsIcon from "components/icons/SettingsIcon";
import SearchIcon from "components/icons/SearchIcon";
import UserIcon from "components/icons/UserIcon";
import ToolIcon from "components/icons/ToolIcon";
import EditIcon from "components/icons/EditIcon";
import CircleMinusIcon from "components/icons/CircleMinusIcon";
import LogoutIcon from "components/icons/LogoutIcon";
import Dropdown from "components/ui/Dropdown";
import Select from "@components/ui/Select";

import {
  setActiveProject,
  selectMappedProjects,
  selectActiveProject,
} from "features/projects/projectsSlice";

function Header() {
  const activeProject = useAppSelector(selectActiveProject);
  const projects = useAppSelector(selectMappedProjects);

  const selectedProject = { label: activeProject?.title || "", value: activeProject?._id || "" };

  const ui = useUi();

  const dispatch = useAppDispatch();

  const router = useRouter();

  const setProject = (value: string) => {
    dispatch(setActiveProject(value));
    router.push(`/projects/${value}`);
  };

  return (
    <header className={styles.appHeader}>
      <div className={styles.appHeaderLeft}>
        <button
          className={`${styles.appHeaderHandle} button icon round p-2`}
          onClick={() => ui.toggleNav()}
        >
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
          <Select list={projects} onSelect={setProject} selected={selectedProject} />
          <Dropdown className="button icon ml-1" toggleContent={<SettingsIcon />}>
            <div className="w-60 px-3 py-4 border-b">Lorem ipsum, projectus descriptum.</div>
            <Dropdown.List>
              <button>
                <EditIcon size={18} /> Rename board
              </button>
              <button>
                <ToolIcon size={18} /> Manage board
              </button>
              <button className="text-red-500">
                <CircleMinusIcon size={18} /> Close board
              </button>
            </Dropdown.List>
          </Dropdown>
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
          <Dropdown className="button icon round ml-1 p-2" toggleContent={<UserIcon />}>
            <Dropdown.List>
              <button>
                <ToolIcon size={18} /> manage profile
              </button>
              <button className="text-red-500">
                <LogoutIcon size={18} /> Logout
              </button>
            </Dropdown.List>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default Header;
