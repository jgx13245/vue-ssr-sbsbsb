const ADMIN_CODE = '000000'

module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('channel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '自增ID'
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      defaultValue: '',
      comment: '渠道名称'
    },
    desc: {
      type: DataTypes.STRING,
      comment: '渠道描述'
    }
  })

  /**
   * 模型关联
   * @param models
   */
  Channel.associate = function (models) {
    Channel.belongsTo(models.User)
  }

  return Channel
}
