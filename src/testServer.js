import { setupServer } from 'msw/node';

import config from '../config';

const { rest } = require('msw');

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseUrl}/products`, async (req, res, ctx) => res(
    ctx.json({
      productDtos: [
        {
          id: 1, title: '피티', trainerId: 1,
        },
        {
          id: 2, title: '이용권', trainerId: 1,
        },
      ],
    }),
  )),

  rest.get(`${baseUrl}/products/:productId`, async (req, res, ctx) => {
    const { productId } = await req.params;

    if (productId === '1') {
      return res(
        ctx.json({
          id: 1,
          title: '피티',
          trainerId: 1,
          options: [{
            id: 1,
            productId: 1,
            dateOfUse: 30,
            ptTimes: 12,
            price: 180000,
          }],
        }),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.get(`${baseUrl}/trainers/:trainerId/lectures`, async (req, res, ctx) => {
    const { trainerId } = await req.params;

    if (trainerId === '1') {
      return res(
        ctx.json(
          {
            trainerLectureDtos:
            [
              {
                id: 1, trainerId: 1, date: '2022-12-08T09:00', userId: 1, status: 'CREATED',
              },
              {
                id: 2, trainerId: 1, date: '2022-12-08T11:00', userId: 1, status: 'CREATED',
              },
            ],
            startTime: '09:00',
            endTime: '18:00',
          },
        ),
      );
    }

    return res(
      ctx.json({}),
    );
  }),

  rest.get(`${baseUrl}/users/:userId/lectures`, async (req, res, ctx) => {
    const { userId } = await req.params;

    if (userId === '1') {
      return res(
        ctx.json(
          [
            {
              id: 1, userName: '오진성', date: '2022-12-08', time: '10:00', status: 'CREATED',
            },
            {
              id: 2, userName: '오진성', date: '2022-12-08', time: '11:00', status: 'CREATED',
            },
          ],
        ),
      );
    }

    return res(
      ctx.json({}),
    );
  }),

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

  rest.post(`${baseUrl}/requests`, async (req, res, ctx) => {
    const {
      senderId, receiverId, senderName, context, type,
    } = await req.json();

    const status = 'CREATED';

    if (type === 'requestPt') {
      const time = new Date(context);
      const message = `${senderName}님 ${time.getFullYear()}년 ${time.getMonth()
         + 1}월 ${time.getDate()}일 ${time.getHours()}시에 피티 등록 요청.`;

      console.log(message);

      return res(
        ctx.json({
          id: 1,
          senderId,
          receiverId,
          message,
          context,
          status,
        }),
      );
    }

    return res(
      ctx.json({ }),
    );
  }),

  rest.get(`${baseUrl}/schedules`, async (req, res, ctx) => {
    const { trainerId } = await req.url.searchParams.get('trainerId');
    const { date } = await req.url.searchParams.get('date');

    return res(ctx.json({
      emptySchedules: [
        '11:00', '12:00', '13:00',
      ],
    }));
  }),

  rest.get(`${baseUrl}/users`, async (req, res, ctx) => res(
    ctx.json({
      id: 1, userName: '오진성', name: '오진성', ptTimes: 12, periodOfUse: 90,
    }),
  )),

  rest.get(`${baseUrl}/trainers/:trainerId`, async (req, res, ctx) => {
    const { trainerId } = req.params;

    if (trainerId === '1') {
      return res(
        ctx.json({
          id: 1, userName: '오진욱', name: '오진욱', startTime: '09:00', endTime: '17:00',
        }),
      );
    }

    return res(ctx.status(400));
  }),
);

export default server;
