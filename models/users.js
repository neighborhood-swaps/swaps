
// ****************** WORKING DATABASE ********************

module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", 
        {
            user_id: {
                type: DataTypes.STRING,
                primaryKey: true,
                autoIncrement: false,
                allowNull: false,
                validate: { len: [1] } 
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len: [1] }
            }, 
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len: [1] }
            }, 
            user_email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { isEmail: true }
            }
        }, 
        { 
            timestamps: false
        },
        {
            classMethods: {
                associate: function(models) {
                    Users.hasMany(models.Products, 
                        { 
                            onDelete: "cascade",
                        }
                    ); 
                } 
            }
        } 
    ); 
    return Users;
};

