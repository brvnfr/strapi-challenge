import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::comment.comment', ({ strapi }) => ({
  async getComments(ctx) {
    try {
      const { postId, page = '1', pageSize = '5' } = ctx.query as { postId: string, page: string, pageSize: string };

      if (!postId) {
        return ctx.badRequest('O parâmetro postId é obrigatório.');
      }

      const comments = await strapi.db.query('api::comment.comment').findMany({
        where: { post: { documentId: postId } },
        populate: ['user'],
        limit: parseInt(pageSize, 10),
        offset: (parseInt(page, 10) - 1) * parseInt(pageSize, 10),
        orderBy: { createdAt: 'desc' },
      });

      const total = await strapi.db.query('api::comment.comment').count({
        where: { post: { documentId: postId } },
      });

      ctx.body = {
        comments,
        pagination: {
          page: parseInt(page, 10),
          pageSize: parseInt(pageSize, 10),
          total,
        },
      };
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
      ctx.throw(500, 'Erro ao buscar comentários.');
    }
  },
}));
