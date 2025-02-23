import type { Core } from '@strapi/strapi';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  console.log('Plugin Comments Pagination iniciado');
};

export default bootstrap;
