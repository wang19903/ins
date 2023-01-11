"use strict";

/**
 *  post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  async create(ctx) {
    // const data = ctx.request.body;
    const { user } = ctx.state;
    const { id } = user;
    // data.user = id;
    // const post = await strapi.entityService.create("api::post.post", data);
    // ctx.send(post);
    const dataObj = JSON.parse(ctx.request.body.data);
    if (dataObj) {
      dataObj.user = id;
      ctx.request.body.data = JSON.stringify(dataObj);
    } else {
      ctx.sendStatus(401);
    }
    return super.create(ctx);
  },
  async find(ctx) {
    const posts = await super.find(ctx);
    const { user } = ctx.state;
    const { id } = user;

    posts.data.forEach((post) => {
      // 我喜欢的
      let index = post.attributes.liked_bies?.data?.findIndex(
        (user) => user?.id === id
      );
      if (index === -1) {
        post.attributes.likedByMe = false;
      } else {
        post.attributes.likedByMe = true;
      }
      // 我收藏的
      let index2 = post.attributes.favored_bies?.data?.findIndex(
        (user) => user?.id === id
      );
      if (index2 === -1) {
        post.attributes.favoredByMe = false;
      } else {
        post.attributes.favoredByMe = true;
      }

      post.attributes.liked_bies = post.attributes.liked_bies?.data?.length;
      post.attributes.comments = post.attributes.comments?.data?.length;
      post.attributes.favored_bies = post.attributes.favored_bies?.data?.length;
    });

    ctx.body = posts;
  },
  async me(ctx) {
    const id = ctx.state.user.id;
    const posts = await strapi.entityService.findMany("api::post.post", {
      filters: {
        user: id,
      },
    });
    ctx.send(posts);
  },
  async like(ctx) {
    return strapi.service("api::post.post").likeOrFavor(ctx, "like");
  },
  async favor(ctx) {
    return strapi.service("api::post.post").likeOrFavor(ctx, "favor");
  },
}));
