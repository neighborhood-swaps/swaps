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

//******* by Maria and Adrian *** this is what we got working with what we need **************

module.exports = function(sequelize, DataTypes) {
    var Products = sequelize.define("Products", { // 2nd argument in define method for columns 
			// started_at: {
			//   type: DataTypes.DATE,
			//   allowNull: false,
			//   defaultValue: DataTypes.NOW
			// },
            category: {
            	type: DataTypes.STRING,
            	// allowNull: false,
                allowNull: true
            	// validate: { len:[1] }
            }, //2nd col
            description: {
            	type: DataTypes.STRING,
            	// allowNull: false,
                allowNull: true
            	// validate: { len:[1] }
            }, //2nd col
            img_location: {
            	type: DataTypes.STRING,
            	allowNull: true
            },
           	condition: {
            	type: DataTypes.STRING,
            	// allowNull: false,
                allowNull: true
            	// validate: { len:[1] }
            }, 
            availabilitiy: {
            	type: DataTypes.STRING,
            	// allowNull: false,
                allowNull: true
            	// validate: { len:[1] }
            }, 
            swap_location: {
            	type: DataTypes.STRING,
            	// allowNull: false,
                allowNull: true
            	// validate: { len:[1] }
            },
            comments: {
            	type: DataTypes.STRING,
            	allowNull: true,
            }, 
            user_id: {
            	type: DataTypes.STRING,
            	// allowNull: false,
                allowNull: true
            	// validate: { len:[1] }
            } 
             //3rd col
        }// end of the 2nd argument in define method

        // We are creating a foreignkey boject which is the third argument in define method 
        // to join products model and users model
        // {
        //     classMethods: {
        //     	associate: function(models) {
        //     		Products.belongsTo(models.Users, {
        //     			foreignKey: { allowNull: false }		
        //     		});// end of belongdsTo method
        //     	}//end of associate
        //     }// end of classMethod
        // }//fk is 3d argument
	);// end of define
	return Products;
};//exports
