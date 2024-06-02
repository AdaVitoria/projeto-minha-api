const Sequelize = require('sequelize');
const databaseConfig = require('../configs/db');
const Users = require('../apps/models/Users');
const Hosts = require('../apps/models/Hosts');
const HostUsers = require('../apps/models/HostUsers');
const Pendencia = require('../apps/models/Pendencia');
const PendenciaUsers = require('../apps/models/Pendencia');

const models = [Users, Hosts, HostUsers, Pendencia, PendenciaUsers];


class Database {
    constructor() {
      this.init();
    }
  
    init() {
      this.connection = new Sequelize(databaseConfig);

      models
      .map(model => model.init(this.connection))
    }
  }
  
  module.exports = new Database();
