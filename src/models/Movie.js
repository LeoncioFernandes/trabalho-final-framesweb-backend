import { DataTypes } from "sequelize";
import db from "../db/db.js";

export default db.define("movies", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  actor: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  ageGroup: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  deletedAt: {
    type: DataTypes.DATE
  },
}, {
  timestamps: true,
  paranoid: true,
})