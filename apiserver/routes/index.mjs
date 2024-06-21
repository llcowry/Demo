import Router from '@koa/router';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    msg: 'Request successful',
    data: {
      message: 'Hello, this is your optimized Koa API server!',
    },
  };
});

export default router;
