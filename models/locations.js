
module.exports = function(sequelize, DataTypes) {
    var Locations = sequelize.define("Locations", 
        {
            swap_location: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len:[1] }
            },
            swap_lat: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: { min: -90, max: 90 }
            }, 
            swap_long: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: { min: -180, max: 180 } 
            }
        },
        {
            timestamps: false
        },
        {
            classMethods: {
                associate: function(models) {
                    Locations.hasMany(models.Products, 
                        { 
                            onDelete: "cascade",
                        } 
                    );
                } 
            }
        }
    ); 
    return Locations;
};