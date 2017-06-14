

//******* WORKING DATABASE **************

module.exports = function(sequelize, DataTypes) {
    var Products = sequelize.define("Products", 
        {   
            user_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len:[1] }
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len:[1] }
            }, 
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len:[1] }
            }, 
            img_location: {
                type: DataTypes.STRING,
                allowNull: false
            },
            prod_condition: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: { len:[1] }
            }, 
            availabilitiy: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len:[1] }
            }, 
            swap_location: {
            	type: DataTypes.STRING,
            	allowNull: false,
            	validate: { len:[1] }
            },
            comments: {
            	type: DataTypes.STRING,
            	allowNull: true,
            }, 
            user_id: {
            	type: DataTypes.STRING,
            	allowNull: true,//-----------------------------------temp true
            	validate: { len:[1] }
            } 
        },
        {
            classMethods: {
            	associate: function(models) {
            		Products.belongsTo(models.Users, 
                        {
                            onDelete: "cascade",
                            foreignKey: {
                                // allowNull: false
                            }
                        }
                    );		
            	}, 
                associate: function(models) {
                    Products.belongsTo(models.Locations, 
                        {
                            onDelete: "cascade",
                            foreignKey: {
                                // allowNull: false
                            }               
                        }
                    );
                }
            }
        }
	);
	return Products;
};
