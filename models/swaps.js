

//******* WORKING DATABASE **************

module.exports = function(sequelize, DataTypes) {
    var Swaps = sequelize.define("Swaps", 
        { 
            requester_id: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len: [1] }
            },
            poster_id: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len: [1] }
            },
            requester_product_id: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len: [1] }
            },
            poster_product_id: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { len: [1] }
            }
        },
        {
            timestamps: false
        }
    ); 
    return Swaps;
}; 


