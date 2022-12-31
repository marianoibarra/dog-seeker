const { DataTypes, Op } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.Te
module.exports = (sequelize) => {
  // defino el modelo
  const Dog = sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Dog name is required.'
        },
        is: {
          args: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gim,
          msg: 'Name format is invalid.'
        },
        len: {
          args: [3, 40],
          msg: "Name length must be between 3 and 40 characters."
        },
        iUnique(value, next) {
          Dog.findAll({
            where: {name: {[Op.iLike]: value}}
          }).then(name => {
            if(name.length > 0) {
              throw new Error()
            }
            return next()
          }).catch(e => next('Already exist a dog breed with that name.'))
      }}
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Dog name is required.'
        },
        is: {
          args: /^([0-9]{1,2}) - ([0-9]{1,2})$/,
          msg: 'Height format is invalid.'
        }
      }
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^([0-9]{1,2}) - ([0-9]{1,2})$/,
          msg: 'Weight format is invalid.'
        }
      }
    },
    life_span: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^([0-9]{1,2}) - ([0-9]{1,2})$/,
          msg: 'Life span format is invalid.'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'Image url is invalid.'
        }
      }
    }
  }, {
    timestamps: false,
  });
};
