module.exports = function(sequelize, DataTypes) {
    var Locations = sequelize.define("Locations", {
            swap_location: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len:[1] }
            },
            swap_lat: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len: [1] }
            }, 
            swap_long: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len: [1] }
            },
            classMethods: {
                associate: function(models) {
                        Products.hasMany(models.Locations, { onDelete: "cascade" });
                    } 
            }
        }
    ); 
    return Users;
};