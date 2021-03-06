import * as Koa from 'koa'

export const fakeKoaContext = (requestBody = {}, params = {}): Koa.Context => {
    return ({
        request: {
            body: requestBody,
        },
        body: {},
        params,
        status: 200,
        assert: jest.fn((bool: boolean, _status: number, message = 'Assert failed') => {
            if (!bool) {
                throw new Error(message)
            }
        }),
    } as unknown) as Koa.Context
}

export const fakeKoaNext: Koa.Next = (): Promise<unknown> => Promise.resolve('test')