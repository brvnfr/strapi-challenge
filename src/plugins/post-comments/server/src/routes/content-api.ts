export default [
  {
    method: 'GET',
    path: '/comments',
    handler: 'comment.getComments',
    config: {
      auth: false,
      policies: [],
    },
  },
];
