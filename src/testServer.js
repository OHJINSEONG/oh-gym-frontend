import { setupServer } from 'msw/node';

import config from '../config';

const { rest } = require('msw');

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseUrl}/products`, async (req, res, ctx) => res(
    ctx.json({
      productDtos: [{
        id: 1, title: '헬스장 이용권', price: 180000,
      },
      {
        id: 2, title: '피티', price: 360000,
      }],
    }),
  )),

  rest.get(`${baseUrl}/products/:productId`, async (req, res, ctx) => {
    const { productId } = await req.params;

    if (productId === '1') {
      return res(
        ctx.json({
          id: 1,
          title: '이용권',
          price: 180000,
        }),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.get(`${baseUrl}/lectures`, async (req, res, ctx) => res(
    ctx.json([
      {
        id: 1, trainer: '오진성', date: '2022/12/06', time: '11:00',
      },
      {
        id: 2, trainer: '오진욱',
      },
    ]),
  )),

  rest.post(`${baseUrl}/lectures`, async (req, res, ctx) => {
    const { orderId, trainer } = await req.json();

    return res(
      ctx.json([
        {
          id: 1, trainer, date: '2022/12/06', time: '11:00', orderId,
        },
        {
          id: 2, trainer, date: '2022/12/08', time: '11:00', orderId,
        },
      ]),
    );
  }),

  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => res(
    ctx.json([
      {
        id: 1, productId: 1,
      },
      {
        id: 2, productId: 1,
      },
    ]),
  )),

  rest.post(`${baseUrl}/orders`, async (req, res, ctx) => {
    const { productId, ptStartDate } = await req.json();

    return res(
      ctx.json({ id: 1, productId, ptStartDate }),
    );
  }),

  rest.get(`${baseUrl}/orders/:orderId`, async (req, res, ctx) => {
    const { orderId } = await req.params;

    if (orderId === '1') {
      return res(
        ctx.json({ id: 1, productId: 1 }),
      );
    }

    return res(
      ctx.status(400),
    );
  }),
);

export default server;
