const ADMIN_CODE = '000000'

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '自增ID'
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      defaultValue: '',
      comment: '角色类型'
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      defaultValue: '',
      comment: '角色名称'
    },
    desc: {
      type: DataTypes.STRING,
      comment: '角色描述'
    },
    permissions: {
      type: DataTypes.STRING,
      get () {
        const permissions = this.getDataValue('permissions')
        if (!permissions) return []
        try {
          return JSON.parse(permissions)
        } catch (err) {
          return []
        }
      },
      set (value) {
        this.setDataValue('permissions', JSON.stringify(value))
      }
    }
  })

  /**
   * 模型关联
   * @param models
   */
  Role.associate = function (models) {
    // 一个角色有多个用户
    Role.hasMany(models.User)
  }

  return Role
}
