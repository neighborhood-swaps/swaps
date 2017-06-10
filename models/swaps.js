
module.exports = function(sequelize, DataTypes) {
    var Swaps = sequelize.define("Swaps", { // 2nd argument in define method for columns 
            
        },// end of the 2nd argument in define method

        // We are creating a foreignkey boject which is the third argument in define method 
        //to join products model and users model
        {
            classMethods: {
            	associate: function(models) {
            		Swaps.belongsTo(models.Users, {
                        as: 'userA',
            			foreignKey: { allowNull: false }		
            		});// end of belongdsTo method -- userA fk

                    Swaps.belongsTo(models.Products, {
                        as: 'productA',
                        foreignKey: { allowNull: false }        
                    });// end of belongdsTo method -- productA fk

                    Swaps.belongsTo(models.Users, {
                        as: 'userB',
                        foreignKey: { allowNull: false }        
                    });// end of belongdsTo method -- userB fk

                    Swaps.belongsTo(models.Products, {
                        as: 'productB',
                        foreignKey: { allowNull: false }        
                    });// end of belongdsTo method -- productB fk

            	}//end of associate
            }// end of classMethod
        }//fk is 3d argument
	);// end of define
	return Swaps;
};//exports

// module.exports = function(sequelize, DataTypes) {
//     var Swaps = sequelize.define("Swaps", { // 2nd argument in define method for columns 
//             swaps_location: {
//             	type: DataTypes.STRING,
//             	allowNull: false,
//             	validate: { len:[1] }
//             },// 1st col

//             swaps_date: {
//             	type: DataTypes.DATE,
//             	allowNull: false,
//             	validate: { len:[1] }
//             }, //2nd col

//             swaps_time: {
//             	type: DataTypes.TIME,
//             	allowNull: true,
//             } //3rd col
//         },// end of the 2nd argument in define method

//         // We are creating a foreignkey boject which is the third argument in define method 
//         //to join products model and users model
//         {
//             classMethods: {
//             	associate: function(models) {
//             		Swaps.belongsTo(models.Users, {
//                         as: 'users',
//             			foreignKey: { allowNull: false }		
//             		});// end of belongdsTo method -- fk21

//                     Swaps.belongsTo(models.Products, {
//                         as: 'products',
//                         foreignKey: { allowNull: false }        
//                     });// end of belongdsTo method -- fk2
//             	}//end of associate
//             }// end of classMethod
//         }//fk is 3d argument
// 	);// end of define
// 	return Swaps;
// };//exports

