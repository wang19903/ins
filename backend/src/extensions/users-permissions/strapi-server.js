"user strict";

const sanitizeOutput = (user) => {
  const { password, resetPasswordToken, confirmationToken, ...sanitizedUser } =
    user; // be careful, you need to omit other private attributes yourself
  return sanitizedUser;
};

module.exports = (plugin) => {
  plugin.controllers.user.me = async (ctx) => {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized();
    }

    const me = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      { populate: ctx.query.populate || [] }
    );

    ctx.body = await sanitizeOutput(me);
  };

  plugin.controllers.user.findOne = async (ctx) => {
    const { id } = ctx.params.id;
    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.params.id,
      { populate: ["likes", "favors"] }
    );

    ctx.body = sanitizeOutput(user);
  };

  plugin.controllers.user.find = async (ctx) => {
    const users = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
      { ...ctx.params, populate: ["likes", "favors"] }
    );

    ctx.body = users.map((user) => sanitizeOutput(user));
  };

  return plugin;
};
