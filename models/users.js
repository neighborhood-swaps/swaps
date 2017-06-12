// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
// var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
	var Users = sequelize.define("Users", {
			user_id: {
				type: DataTypes.STRING,
				primaryKey: true,
				autoIncrement: false,
				allowNull: false,
				validate: { len: [1] }
			},// user_id

			first_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: { len: [1] }
			},// first_name

			last_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: { len: [1] }
			},// last_name

			user_email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {isEmail: true}
			},// emial

			user_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: { len: [1] }
			},// user_name


			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: { len: [1] }
			}//password
		},// end of 2nd argument which contains the columns for Users' model
		
		{//join .. Saying that a user could have more than one product to exchange with other users
			classMethods: {
				associate: function(models) {
					//onDelete: "cascade": When a user is deleted, also delete any associated Products
					Users.hasMany(models.Products, { onDelete: "cascade"});
				}// end of associate
			}// end of class method
 		}// join
 	);// end of define 
 	return Users;
};// end of module.exports