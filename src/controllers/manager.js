const knex = require("knex");

class Manager {
  constructor(config, table) {
    this._db = knex(config);
    this._table = table;
  }

  async create(obj) {
    try {
      let id = await this._db(this._table).insert(obj);
      return id;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getById(row) {
    try {
      let data = await this._db(this._table).whereRaw("id = ?", row);
      return JSON.parse(JSON.stringify(...data));
    } catch (error) {
      console.log(error.message);
    }
  }

  async getAll() {
    try {
      let data = await this._db.from(this._table).select("*");
      return JSON.parse(JSON.stringify(data));
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateById(obj) {
    try {
      let data = await this._db(this._table)
        .where({ id: obj.id })
        .update({ name: obj.name, price: obj.price, thumbnail: obj.thumbnail });
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteById(id) {
    try {
      let data = await this._db(this._table).where({ id: id }).del();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = Manager;
