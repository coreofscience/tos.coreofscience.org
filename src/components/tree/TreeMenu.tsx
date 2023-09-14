import {FC} from "react";
import {Section} from "../../types/treeType";
import {Props} from "../../types/treeMenuTypes";

import "./TreeMenu.css";


const TreeMenu: FC<Props> = ({info, treeSections, show, toggleShow}) => {
  return (
    <>
      <div className="tree-menu">
        <button
          className={`btn btn-root root ${
            !show || show === "root" ? "active" : "inactive"
          }`}
          title="Show only root"
          onClick={() =>
            toggleShow("root" as Section)
          }
          key="menu-root"
        >
          <strong>{(info.root || { title: "" }).title}</strong>
          <small>{treeSections.root.length} articles</small>
        </button>

        <button
          className={`btn btn-trunk trunk ${
            !show || show === "trunk" ? "active" : "inactive"
          }`}
          title="Show only trunk"
          onClick={() =>
            toggleShow("trunk" as Section)
          }
          key="menu-trunk"
        >
          <strong>{(info.trunk || { title: "" }).title}</strong>
          <small>{treeSections.trunk.length} articles</small>
        </button>

        {treeSections.branch_1 && (
          <div className="btn-branches" key="section-branches">
            <button
              key="menu-branch_1"
              className={`btn btn-branch branch ${
                !show || show === "branch_1" ? "active" : "inactive"
              }`}
              title="Show only branch 1"
              onClick={() =>
                toggleShow("branch_1" as Section)
              }
            >
              <strong>{(info.branch_1 || { title: "" }).title}</strong>
            </button>

            <button
              key="menu-branch_2"
              className={`btn btn-branch branch ${
                !show || show === "branch_2" ? "active" : "inactive"
              }`}
              title="Show only branch 2"
              onClick={() =>
                toggleShow("branch_2" as Section)
              }
            >
              <strong>{(info.branch_2 || { title: "" }).title}</strong>
            </button>

            <button
              key="menu-branch_3"
              className={`btn btn-branch branch ${
                !show || show === "branch_3" ? "active" : "inactive"
              }`}
              title="Show only branch 3"
              onClick={() =>
                toggleShow("branch_3" as Section)
              }
            >
              <strong>{(info.branch_3 || { title: "" }).title}</strong>
            </button>
          </div>
        )}

        <button
          className={`btn btn-leaf leaf ${
            !show || show === "leaf" ? "active" : "inactive"
          }`}
          title="Show only leaf"
          onClick={() =>
            toggleShow("leaf" as Section)
          }
          key="menu-leaf"
        >
          <strong>{(info.leaf || { title: "" }).title}</strong>
          <small>{treeSections.leaf.length} articles</small>
        </button>
      </div>
    </>
  )
}

export default TreeMenu;
