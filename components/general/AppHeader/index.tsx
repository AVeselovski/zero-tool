import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { useMemo } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { useUi } from "app/ui-store";

import styles from "./AppHeader.module.css";
import MenuIcon from "components/icons/MenuIcon";
import SidebarIcon from "components/icons/SidebarIcon";
import SettingsIcon from "components/icons/SettingsIcon";
import SearchIcon from "components/icons/SearchIcon";
import UserIcon from "components/icons/UserIcon";
import ToolIcon from "components/icons/ToolIcon";
import EditIcon from "components/icons/EditIcon";
import CircleMinusIcon from "components/icons/CircleMinusIcon";
import LogoutIcon from "components/icons/LogoutIcon";
import Dropdown from "components/ui/Dropdown";
import Select from "components/ui/Select";

import {
  setActiveProject,
  selectMappedProjects,
  selectActiveProject,
} from "features/projects/projectsSlice";

function getUserInitials(name: string) {
  if (!name) return "";

  const nameArr = name.split(" ");
  let initials = nameArr[0].split("")[0];

  if (nameArr[1]) {
    initials = initials + nameArr[1].split("")[0];
  }

  return initials;
}

function Header() {
  const { data: session } = useSession();

  const activeProject = useAppSelector(selectActiveProject);
  const projects = useAppSelector(selectMappedProjects);

  const selectedProject = { label: activeProject?.name || "", value: activeProject?.id || null };

  const ui = useUi();

  const dispatch = useAppDispatch();

  const router = useRouter();

  const isProjectPage = router.asPath !== "/dashboard";

  const userInitials = useMemo(
    () => session?.user?.name && getUserInitials(session?.user?.name),
    [session?.user?.name]
  );

  const setProject = (value: number) => {
    dispatch(setActiveProject(value));
    router.push(`/projects/${value}`);
  };

  return (
    <header className={styles.appHeader}>
      <div className={styles.appHeaderLeft}>
        <button
          className={`${styles.appHeaderHandle} button icon round p-2`}
          onClick={() => ui.toggleAppNav()}
        >
          <MenuIcon />
        </button>
        {isProjectPage && (
          <button
            className={`${styles.appHeaderHandle} button icon round p-2`}
            onClick={() => ui.toggleProjectSidebar()}
          >
            <SidebarIcon />
          </button>
        )}
        {!isProjectPage && (
          <h1 className={styles.appHeaderBrand}>
            <Link href="/">
              <a className="flex items-center">Zero Tool</a>
            </Link>
          </h1>
        )}
        {isProjectPage && (
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
          </div>
        )}
      </div>
      <div className={styles.appHeaderCenter}>
        <div className={styles.appHeaderSearch}>
          <input className="input wide" placeholder="Search..." type="text" />
          <button>
            <SearchIcon />
          </button>
        </div>
      </div>
      <div className={styles.appHeaderRight}>
        <div className={styles.appHeaderActions}>
          <Dropdown className="button icon round ml-1 p-2" toggleContent={<UserIcon />}>
            <div className="px-3 py-4 border-b text-left flex items-center">
              <div className="rounded-full w-full border flex items-center pr-4">
                <div className="rounded-full w-10 h-10 mr-2 flex items-center justify-center bg-gray-50 text-xl">
                  {userInitials}
                </div>
                <div className="block">
                  <div className="mb-0">{session?.user?.name || "..."}</div>
                  <div className="text-xs -mt-1">{session?.user?.email}</div>
                </div>
              </div>
            </div>
            <Dropdown.List>
              <button>
                <ToolIcon size={18} /> manage profile
              </button>
              <button className="text-red-500" onClick={() => signOut()}>
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
