import { DataTypes } from "sequelize";
import db from "../db/db.js";

export default db.define("movies", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  urlImage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  actor: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  ageGroup: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  score: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  releaseYear: {
    type: DataTypes.STRING(10),
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