import User from "../user";
import db from "../../db";

const createUser = (props = {}): Promise<User> =>
  User.create(
    Object.assign(
      {
        password: "q1w2e3r4",
        email: "example@example.com",
      },
      props,
    ),
  );

describe("User", () => {
  beforeEach(() => db.sync({ logging: false, force: true }));

  describe("#create", () => {
    it("should hash the given password", async () => {
      const user = await createUser();

      expect(user.password).not.toBe("q1w2e3r4");
    });
  });

  describe("#update", () => {
    it("should hash if the password changed", async () => {
      const user = await createUser();

      const originalHash = user.password;

      await user.update({
        password: "letmein",
        email: "example@example.com",
      });

      expect(user.password).not.toBe(originalHash);
    });

    it("should keep the same hash if the password didnt change", async () => {
      const user = await createUser();
      const originalHash = user.password;

      await user.update({
        email: "example+changed@example.com",
      });

      expect(user.password).toBe(originalHash);
    });
  });
});
