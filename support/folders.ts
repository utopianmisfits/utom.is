import path from "path";

// Allows us to change this folder as needed in CI
const dist = process.env.DIST_FOLDER || "dist";

export default {
  config: path.resolve(__dirname, `../config`),
  dist: path.resolve(__dirname, `../${dist}`),
  views: path.resolve(__dirname, "../views"),
  pkg: path.resolve(__dirname, "../package.json"),
  pkgLock: path.resolve(__dirname, "../package-lock.json"),
};
