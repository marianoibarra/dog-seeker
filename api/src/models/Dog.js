const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.Te
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gim,
        len: [3, 40]
      },
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /([0-9]{1,2}) - ([0-9]{1,2})/
      }
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /([0-9]{1,2}) - ([0-9]{1,2})/
      }
    },
    life_span: {
      type: DataTypes.STRING,
      validate: {
        is: /([0-9]{1,2}) - ([0-9]{1,2})/
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  }, {
    timestamps: false
  });
};
