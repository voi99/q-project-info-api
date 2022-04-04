module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8d32f7b264a17ab07e2a4ce6dc8ee26a'),
  },
});
