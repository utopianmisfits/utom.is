import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
import { hash } from "../services/password";

export default class User extends Model {
  public id!: string;
  public email!: string;
  public password!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(95),
      allowNull: false,
    },
  },
  { sequelize },
);

const hashUserPassword = async (user: User): Promise<void> => {
  const hashedPw = await hash(user.password);
  user.password = hashedPw;
};

/**
 * beforeCreate
 *
 * Before creating an user, hash their password using argon2
 * This ensures that the password is never actualky stored in the database
 */
User.beforeCreate(hashUserPassword);

/**
 * beforeUpdate
 *
 * Before updating an user, check if their password changed, if so, then hash
 * their password using argon2 This ensures that the password is never actually
 * stored in the database
 */
User.beforeUpdate(
  (user: User): Promise<void> =>
    user.changed("password") ? hashUserPassword(user) : Promise.resolve(),
);
