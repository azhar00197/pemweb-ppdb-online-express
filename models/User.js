const { DataTypes } = require('sequelize');
/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @returns
 */
const User = (sequelize) => sequelize.define('data_siswa_2', {
  nis: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jenisKelamin: {
    type: DataTypes.STRING,
    field: 'jenis_kelamin',
    allowNull: false,
    defaultValue: 'LAKI-LAKI',
  },
  agama: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  tempatLahir: {
    type: DataTypes.STRING,
    field: 'tempat_lahir',
    allowNull: false,
    defaultValue: '',
  },
  tanggalLahir: {
    type: DataTypes.DATEONLY,
    field: 'tanggal_lahir',
    allowNull: false,
    defaultValue: '1990-01-01',
  },
  rata2Un: {
    type: DataTypes.DOUBLE,
    field: 'rata_rata_UN',
    allowNull: false,
    defaultValue: 0,
  },
  gajiOrtuPertahun: {
    type: DataTypes.BIGINT.UNSIGNED,
    field: 'gaji_orang_tua_pertahun',
    allowNull: false,
    defaultValue: 0,
  },
  asalSekolah: {
    type: DataTypes.STRING,
    field: 'asal_sekolah',
    allowNull: false,
    defaultValue: '',
  },
  foto: {
    type: DataTypes.TEXT,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = User;
