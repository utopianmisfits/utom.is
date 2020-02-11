import { exec } from "child_process";
import folders from "./folders";

// The `ci` command messes up our project's node_modules folder when ran multiple times
const cmd = process.env.GITHUB_ACTIONS === "true" ? "ci" : "install";

exec(
  `npm ${cmd} \
    --only=production \
    --no-audit \
    --no-bin-links \
    --no-optional`,
  { cwd: folders.dist },
  (err, stdout, stderr) => {
    if (err) {
      throw err;
    }

    console.log(stdout, stderr);
  },
);
