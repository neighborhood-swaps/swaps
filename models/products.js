// module.exports = function(sequelize, DataTypes) {
//     var Products = sequelize.define("Products", { // 2nd argument in define method for columns
//             product_name: {
//             	type: DataTypes.STRING,
//             	allowNull: false,
//             	validate: { len:[1] }
//             },// 1st col

//             product_description: {
//             	type: DataTypes.STRING,
//             	allowNull: false,
//             	validate: { len:[1] }
//             }, //2nd col

//             product_img: {
//             	type: DataTypes.TEXT,
//             	allowNull: true,
//             } //3rd col
//         },// end of the 2nd argument in define method

//         // We are creating a foreignkey boject which is the third argument in define method
//         //to join products model and users model
//         {
//             classMethods: {
//             	associate: function(models) {
//             		Products.belongsTo(models.Users, {
//             			foreignKey: { allowNull: false }
//             		});// end of belongdsTo method
//             	}//end of associate
//             }// end of classMethod
//         }//fk is 3d argument
// 	);// end of define
// 	return Products;
// };//exports

//******* WORKING DATABASE **************

module.exports = function(sequelize, DataTypes) {
    var Products = sequelize.define("Products", 
        { 
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
            	allowNull: false,
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
