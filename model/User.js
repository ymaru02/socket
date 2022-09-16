const User = (Sequelize, DataTypes) => {
  const model = Sequelize.define(
    "user",
    {
      id: {
        // id int not null primary key auto_increment
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        // name varchar(10) not null
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      pw: {
        // comment midiumtext
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    { tableName: "user", freezTableName: true, timestamps: false }
  );
  return model;
};

module.exports = User;
