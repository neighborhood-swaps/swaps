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