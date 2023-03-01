"use strict";

/**
 *  comment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::comment.comment", ({ strapi }) => ({
  async create(ctx) {
    const { user } = ctx.state;
    const { id } = user;
    ctx.request.body.data.user = id;
    return super.create(ctx);
  },
}));
