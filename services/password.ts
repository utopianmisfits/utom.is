import * as argon2 from "argon2";

// @SEE: https://crypto.stackexchange.com/questions/37137/what-is-the-recommended-number-of-iterations-for-argon2
const options = {
  type: argon2.argon2id,
};

export const hash = async (password: string): Promise<string> =>
  await argon2.hash(password, options);

export const verify = async (
  hash: string,
  password: string,
): Promise<boolean> => await argon2.verify(hash, password, options);
