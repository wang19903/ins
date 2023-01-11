"use strict";

/**
 * post service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::post.post", {
  async likeOrFavor(ctx, type) {
    const { id } = ctx.params;
    const { user } = ctx.state;
    const { id: userId } = user;

    const relation = type === "like" ? "liked_bies" : "favored_bies";

    const post = await strapi.entityService.findOne("api::post.post", id, {
      populate: [relation],
    });

    const relations = post[relation];

    const index = relations.findIndex((r) => r.id === userId);
    let already = false;
    if (index !== -1) {
      relations.splice(index, 1);
    } else {
      already = true;
      relations.push(userId);
    }

    await strapi.entityService.update("api::post.post", id, {
      data: { [relation]: relations },
    });
    ctx.body = {
      data: already,
    };
  },
});
