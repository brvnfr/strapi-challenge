import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  console.log('Plugin Comments Pagination registrado');
};

export default register;
