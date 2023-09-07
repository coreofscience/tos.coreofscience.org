import { Info } from "../../../types/treeType";
export const info: Info = {
  root: {
    title: "Root",
    info: `
      Here you should find seminal articles from the original articles of
      your topic of interest.
    `,
  },
  trunk: {
    title: "Trunk",
    info: `
      Here you should find articles where your topic of interest got a
      structure, these should be the first authors to discover the
      applicability of your topic of interest.
    `,
  },
  branch: {
    title: "Branch",
    info: `
      Branches represent specific subareas within a knowledge domain, encapsulating
      articles centered around distinct themes derived from cluster analysis.
      Moreover, the Branches also signify the trending topics within that
      particular area.
    `,
    branches: {
      branch_type_1: {
        id: 1,
        title: "Branch 1",
      },
      branch_type_2: {
        id: 2,
        title: "Branch 2",
      },
      branch_type_3: {
        id: 3,
        title: "Branch 3",
      },
    },
  },
  leaf: {
    title: "Leaves",
    info: `
      Here you should find recent articles and reviews that should
      condense very well your topics.
    `,
  },
};
