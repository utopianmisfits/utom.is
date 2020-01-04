import fs from "fs-extra";
import folders from "./folders";

if (fs.pathExistsSync(folders.dist)) {
  fs.emptyDir(folders.dist);
}
