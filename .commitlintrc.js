module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [0, "always", 50],
    "body-max-line-length": [0, "always", 72],
    "footer-max-line-length": [0, "always", 72],
  },
};
