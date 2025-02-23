import type { Core } from '@strapi/strapi';

const destroy = ({ strapi }: { strapi: Core.Strapi }) => {
  console.log('Plugin Comments Pagination finalizado');
};

export default destroy;
