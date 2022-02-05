import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { useUi } from "app/ui-store";
import { useAppSelector } from "app/hooks";
import { selectProjects } from "features/projects/projectsSlice";

import styles from "./AppNavigation.module.css";
import CloseIcon from "components/icons/CloseIcon";
import DashboardIcon from "components/icons/DashboardIcon";
import ClockIcon from "@components/icons/ClockIcon";

function AppNavigation() {
  const { state, toggleAppNav } = useUi();

  const router = useRouter();

  const projects = useAppSelector(selectProjects);

  const appNavRef = useRef<HTMLElement>(null);

  /**
   * Close AppNav on outside click
   */
  useEffect(() => {
    function clickHandler(e: Event) {
      if (appNavRef.current !== null && !appNavRef.current.contains(e.target as Element)) {
        toggleAppNav();
      }
    }

    if (state.appNavOpen) {
      window.addEventListener("click", clickHandler);
    }

    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, [state.appNavOpen, appNavRef, toggleAppNav]);

  /**
   * Close AppNav on route changes
   */
  useEffect(() => {
    if (state.appNavOpen) {
      toggleAppNav();
    }
  }, [router.asPath]); // TODO: suppress this warning

  return (
    <>
      <nav
        className={`${styles.appNav}${state.appNavOpen ? ` ${styles.isOpen}` : ""}`}
        ref={appNavRef}
      >
        <div className="flex justify-end px-2 py-3">
          <button className="button icon round p-2" onClick={toggleAppNav}>
            <CloseIcon />
          </button>
        </div>
        <div className="p-0 pt-5 pb-5 border-b">
          <Link href="/dashboard">
            <a className="flex px-4 py-2 items-center no-underline font-normal hover:bg-gray-100">
              <DashboardIcon className="mr-2" />
              Dashboard
            </a>
          </Link>
        </div>
        <div className="p-0 pt-5 pb-5">
          <h4 className="flex items-center text-sm ml-4 mb-4">
            <ClockIcon className="mr-2" size={18} />
            Recent projects
          </h4>
          {/* TODO: implement recent projects functionality (localStorage or Next backend) */}
          {projects.map(
            (p, i) =>
              i < 2 && (
                <Link href={`/projects/${p.id}`} key={p.id}>
                  <a className="flex px-4 py-2 items-center no-underline font-normal text-sm hover:bg-gray-100">
                    {p.name}
                  </a>
                </Link>
              )
          )}
        </div>
      </nav>
      <div className={`${styles.backdrop}${state.appNavOpen ? ` ${styles.isOpen}` : ""}`}></div>
    </>
  );
}

export default AppNavigation;
