module.exports = ({ strapi }) => {
  return {
    register() {
      console.log('Plugin Comments Pagination registrado');
    },
    bootstrap() {
      console.log('Plugin Comments Pagination iniciado');
    },
    destroy() {
      console.log('Plugin Comments Pagination destruído');
    },
  };
};