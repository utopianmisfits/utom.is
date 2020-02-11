import fs from "fs-extra";
import path from "path";
import folders from "./folders";

fs.copySync(folders.config, path.resolve(folders.dist, "config"));
fs.copySync(folders.views, path.resolve(folders.dist, "views"));
fs.copySync(folders.pkg, path.resolve(folders.dist, "package.json"));
fs.copySync(folders.pkgLock, path.resolve(folders.dist, "package-lock.json"));
