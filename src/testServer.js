import { setupServer } from 'msw/node';

import config from '../config';
import dateFormatter from './utils/DateFormatter';

const { rest } = require('msw');

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseUrl}/products`, async (req, res, ctx) => res(
    ctx.json(
      [
        {
          id: 1, title: '피티', trainerId: 1,
        },
        {
          id: 2, title: '이용권', trainerId: 1,
        },
      ],
    ),
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

  rest.get(`${baseUrl}/users/lectures`, async (req, res, ctx) => res(
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
  )),

  rest.post(`${baseUrl}/orders`, async (req, res, ctx) => {
    const orderData = await req.json();

    return res(
      ctx.json('카카오'),
    );
  }),

  rest.get(`${baseUrl}/orders/kakaoPaySuccess`, async (req, res, ctx) => {
    const token = await req.url.searchParams.get('pg_token');

    if (token === '토큰') {
      return res(
        ctx.json({ item_name: 'PT', amount: { total: 100000 } }),
      );
    }
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
    const trainerId = await req.url.searchParams.get('trainerId');
    const date = await req.url.searchParams.get('date');

    return res(
      ctx.json({
        emptySchedules: [
          '11:00', '12:00', '13:00',
        ],
      }),
    );
  }),

  rest.get(`${baseUrl}/schedules/list`, async (req, res, ctx) => {
    const trainerId = await req.url.searchParams.get('trainerId');

    return res(
      ctx.json([
        {
          date: '2023-01-02',
          trainerSchedules: [
            '11:00', '12:00', '13:00',
          ],
        },
      ]),
    );
  }),

  rest.get(`${baseUrl}/users`, async (req, res, ctx) => res(
    ctx.json({
      id: 1, userName: '오진성', name: '오진성', ptTimes: 12, periodOfUse: 90,
    }),
  )),

  rest.post(`${baseUrl}/users`, async (req, res, ctx) => {
    const { kakaoAccessToken } = await req.json();

    if (kakaoAccessToken) {
      return res(
        ctx.json(
          '토큰',
        ),
      );
    }

    return res(ctx.status(400));
  }),

  rest.get(`${baseUrl}/kakao/session`, async (req, res, ctx) => {
    const code = await req.url.searchParams.get('code');

    if (code) {
      return res(
        ctx.json({
          accessToken: '토큰', kakaoAccessToken: '카카오 토큰',
        }),
      );
    }

    return res(ctx.status(400));
  }),

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

  rest.get(`${baseUrl}/trainers`, async (req, res, ctx) => res(
    ctx.json([
      {
        id: 1, userName: '오진욱', name: '오진욱', startTime: '09:00', endTime: '17:00',
      },
      {
        id: 2, userName: '오진성', name: '오진성', startTime: '09:00', endTime: '17:00',
      },
    ]),
  )),

  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => res(
    ctx.json(
      [
        {
          id: 1,
          productInformation: { id: 1, title: '피티', trainerId: 1 },
          optionInformation: {
            id: 1, ptTimes: 12, price: 360000, useOfDate: 90, type: '피티',
          },
        },
      ],
    ),
  )),

  rest.get(`${baseUrl}/diarys`, async (req, res, ctx) => {
    const date = req.url.searchParams.get('date');

    if (date === '2022-12-25') {
      return res(
        ctx.json(
          {
            diary: {
              id: 1, date, status: 'COMPLETE', time: '00:00:01',
            },
            exerciseInformations: [{ exercise: { id: 1, name: '풀업' }, sets: [] }],
          },
        ),
      );
    }

    return res(
      ctx.json(
        {
          diary: {
            id: 1, date, status: 'CREATED', time: '00:00:01',
          },
          exerciseInformations: [{ exercise: { id: 1, name: '풀업' }, sets: [] }],
        },
      ),
    );
  }),

  rest.get(`${baseUrl}/diarys/list`, async (req, res, ctx) => res(
    ctx.json([
      {
        diary: {
          id: 1, date: '2023-01-02', status: 'CREATED', time: '00:30:00',
        },
        exerciseInformations: [{ exercise: {}, sets: [] }],
      },
    ]),
  )),

  rest.post(`${baseUrl}/diarys`, async (req, res, ctx) => {
    const { date } = await req.json();

    return res(
      ctx.json(
        {
          diary: {
            id: 1, date, status: 'CREATED', time: '00:00:00',
          },
          exerciseInformations: [],
        },
      ),
    );
  }),

  rest.get(`${baseUrl}/diarys/:diaryId`, async (req, res, ctx) => {
    const { diaryId } = await req.params;

    if (diaryId === '1') {
      return res(
        ctx.json(
          {
            diary: {
              id: 1, date: '2023-01-02', status: 'CREATED', time: '00:00:00',
            },
            exerciseInformations: [],
          },
        ),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.patch(`${baseUrl}/diarys/:diaryId`, async (req, res, ctx) => {
    const { diaryId } = await req.params;
    const {
      memo, time,
    } = await req.json();

    if (diaryId === '1') {
      return res(
        ctx.json(
          {
            diary: {
              id: 1, date: '2023-01-02', status: 'COMPLETE', time, memo,
            },
            exerciseInformations: [],
          },
        ),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.post(`${baseUrl}/sets`, async (req, res, ctx) => {
    const { exerciseId } = await req.json();

    if (exerciseId === 1) {
      return res(
        ctx.json(
          {
            id: 1, weight: 0, setNumber: 0, reps: 0, status: 'CREATED',
          },
        ),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.patch(`${baseUrl}/sets`, async (req, res, ctx) => {
    const { exerciseId, sets } = await req.json();

    if (exerciseId === 1) {
      return res(
        ctx.json(
          sets,
        ),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.get(`${baseUrl}/exercises`, async (req, res, ctx) => res(
    ctx.json([
      {
        exercise: {
          id: 1, name: '풀업', status: 'CREATED', type: '등',
        },
        sets: [{
          id: 1, weight: 90, reqs: 10, status: 'CREATED', setNumber: 1,
        }],
      },
    ]),
  )),

  rest.get(`${baseUrl}/exercises/:exerciseId`, async (req, res, ctx) => {
    const { exerciseId } = await req.params;

    if (exerciseId === '1') {
      return res(
        ctx.json(
          {
            exercise: {
              id: 1, name: '풀업', status: 'CREATED', type: '등',
            },
            sets: [{
              id: 1, weight: 90, reqs: 10, status: 'CREATED', setNumber: 1,
            }],
          },
        ),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.post(`${baseUrl}/exercises`, async (req, res, ctx) => {
    const { name, type } = await req.json();

    return res(
      ctx.json(
        {
          exercise: {
            id: 1, name, status: 'CREATED', type,
          },
          sets: [],
        },
      ),
    );
  }),

  rest.patch(`${baseUrl}/exercises/:exerciseId`, async (req, res, ctx) => {
    const { exerciseId } = await req.params;

    if (exerciseId === '1') {
      return res(
        ctx.json(
          {
            exercise: {
              id: 1, name: '풀업', status: 'COMPLETE', type: '등',
            },
            sets: [{
              id: 1, weight: 90, reqs: 10, status: 'CREATED', setNumber: 1,
            }],
          },
        ),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.get(`${baseUrl}/lockers`, async (req, res, ctx) => res(
    ctx.json([
      {
        id: 1, lockerNumber: 3,
      },
    ]),
  )),

  rest.patch(`${baseUrl}/lockers/:lockerId`, async (req, res, ctx) => {
    const { lockerId } = req.params;
    const { userId, requestMessage } = await req.json();

    return res(
      ctx.json(
        {
          id: lockerId, lockerNumber: 3, status: 'RESERVATED',
        },
      ),
    );
  }),

  rest.get(`${baseUrl}/pt-tickets`, async (req, res, ctx) => res(
    ctx.json([
      {
        id: 1, ptTimes: 12, periodOfUse: 30,
      },
      {
        id: 2, ptTimes: 30, periodOfUse: 90,
      },
    ]),
  )),

  rest.get(`${baseUrl}/membership-tickets`, async (req, res, ctx) => res(
    ctx.json([
      {
        id: 1, ptTimes: 12, periodOfUse: 30,
      },
      {
        id: 2, ptTimes: 30, periodOfUse: 90,
      },
    ]),
  )),

  rest.get(`${baseUrl}/pt-tickets/:ptTicketId`, async (req, res, ctx) => {
    const { ptTicketId } = req.params;

    return res(
      ctx.json(
        {
          id: 1, ptTimes: 12, periodOfUse: 30,
        },
      ),
    );
  }),

  rest.get(`${baseUrl}/locker-tickets`, async (req, res, ctx) => res(
    ctx.json(
      {
        id: 1, ptTimes: 0, periodOfUse: 30,
      },
    ),
  )),

  rest.get(`${baseUrl}/pt-tickets/use`, async (req, res, ctx) => res(
    ctx.json(
      {
        id: 1, ptTimes: 12, periodOfUse: 30, status: 'INUSED',
      },
    ),
  )),

  rest.get(`${baseUrl}/membership-tickets/use`, async (req, res, ctx) => res(
    ctx.json(
      {
        id: 1, ptTimes: 0, periodOfUse: 30, status: 'INUSED',
      },
    ),
  )),

  rest.patch(`${baseUrl}/locker-tickets/:lockerTicketId/cancel`, async (req, res, ctx) => {
    const { lockerTicketId } = req.params;

    if (lockerTicketId === '1') {
      return res(
        ctx.json(
          {
            id: 1, ptTimes: 30, startDate: '2022-12-25', status: 'UNUSED',
          },
        ),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.patch(`${baseUrl}/pt-tickets/:ptTicketId`, async (req, res, ctx) => {
    const { ptTicketId } = req.params;
    const date = req.url.searchParams.get('date');

    if (ptTicketId === '1') {
      return res(
        ctx.json(
          {
            id: 1, ptTimes: 30, startDate: '2022-12-25', status: 'INUSED',
          },
        ),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.patch(`${baseUrl}/membership-tickets/:membershipTicketId`, async (req, res, ctx) => {
    const { membershipTicketId } = req.params;
    const date = req.url.searchParams.get('date');

    if (membershipTicketId === '1') {
      return res(
        ctx.json(
          {
            id: 1, ptTimes: 0, startDate: '2022-12-25', status: 'INUSED',
          },
        ),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.patch(`${baseUrl}/sets/:setId`, async (req, res, ctx) => {
    const { setId } = req.params;

    if (setId === '1') {
      return res(
        ctx.json(
          {
            id: 1, reps: 20, weight: 40, status: 'COMPLETE',
          },
        ),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.post(`${baseUrl}/chattingRooms`, async (req, res, ctx) => {
    const { trainerId } = await req.json();

    return res(
      ctx.json(
        {
          id: 1,
          traierName: '오진욱',
          userName: '오진성',
        },
      ),
    );
  }),
);

export default server;
