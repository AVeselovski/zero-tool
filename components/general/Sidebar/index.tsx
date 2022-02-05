import { useUi } from "app/ui-store";

import styles from "./Sidebar.module.css";
import SettingsIcon from "@components/icons/SettingsIcon";
import { useAppSelector } from "@app/hooks";
import { selectProject } from "@features/project/projectSlice";

function Sidebar() {
  const { state } = useUi();

  const project = useAppSelector(selectProject);

  return (
    <nav className={`${styles.sidebar}${state.projectSidebarOpen ? ` ${styles.isOpen}` : ""}`}>
      <div className="px-3 py-4 border-b">
        <button className={styles.projectButton}>
          <h1 className="text-base rounded">{project.name}</h1>
          <SettingsIcon className={styles.icon} />
        </button>
        {/* <p className="text-sm px-3 mb-3">v2-week12-14</p> */}
        {project.description && <p className="px-3">{project.description}</p>}
      </div>
      <div className="px-3 py-4">
        <h2 className="text-sm mb-4">Members</h2>
        <div className="flex flex-wrap gap-1">
          {project.users.map((u) => (
            <div className="rounded-full border inline-flex items-center pr-4" key={u.id}>
              <div className="rounded-full w-6 h-6 mr-2 flex items-center justify-center bg-gray-50 text-sm">
                M
              </div>
              <div className="block">
                <div className="mb-0">{u.username}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
