import { hash, verify } from "../password";

describe("Password", () => {
  describe("hash", () => {
    it("should hash the given string", async () => {
      const pwd = "q1w2e3r4";
      const hashed = await hash(pwd);

      expect(hashed).not.toBe(pwd);
    });
  });

  describe("verify", () => {
    it("should verify a previously known hash", async () => {
      const pwd = "q1w2e3r4";
      const mcf =
        "$argon2id$v=19$m=4096,t=3,p=1$cs36N5D2US0ykirMnNDWvw$aa+cXenCTJPabXz0baAAk+YjhZYUiC/3kq90hrGV8c4";
      const verified = await verify(mcf, pwd);

      expect(verified).toBe(true);
    });
  });
});
