module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define('data', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '自增ID'
    },
    browse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '浏览数量'
    },
    share: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '分享数量'
    },
    button: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '预约按钮点击数量'
    },
    reserve: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '预约成功数量'
    }
  })

  /**
   * 模型关联
   * @param models
   */
  Data.associate = function (models) {
    Data.belongsTo(models.Activity)
    Data.belongsTo(models.Channel)
  }

  return Data
}
