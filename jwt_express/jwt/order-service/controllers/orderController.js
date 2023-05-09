const OrderService = require("../services/orderService");

module.exports = class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }
  async list(req, res) {
    if (this.hasPermission(req, "/order/read")) {
      let limit = parseInt(req.query.limit) || 100;
      let offset = parseInt(req.query.offset) || 0;
      let list = (await req.orderService.findAll(limit, offset)) || [];
      res.send({ offset: offset, limit: limit, size: list.length, data: list });
    } else {
      res.status(403).send({ status: 403, message: "Forbidden" });
    }
  }
  async save(req, res) {
    if (this.hasPermission(req, "/order/write")) {
      let data = req.body;
      let order = await this.orderService.save(data);
      if (order) {
        res.send(order);
      } else {
        res.status(400).send({ status: 400, message: `Invalid Order data` });
      }
    } else {
      res.status(403).send({ status: 403, message: "Forbidden" });
    }
  }
  async fetch(req, res) {
    if (this.hasPermission(req, "/order/read")) {
      let id = parseInt(req.params.id);
      let order = await this.orderService.findById(id);
      if (order) {
        res.send(order);
      } else {
        res
          .status(404)
          .send({ status: 404, message: `Order #${id} not found` });
      }
    } else {
      res.status(403).send({ status: 403, message: "Forbidden" });
    }
  }
  hasPermission(req, permission) {
    let data = req.state.user;
    let permissions = data.permissions.split(",");
    return permissions.includes(permission);
  }
};
