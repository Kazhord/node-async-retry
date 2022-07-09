import retry from './AsyncRetry'

describe('AsyncRetry', () => {
    it('should be ok', async () => {
        const result = await retry(
            async () => {
                return true
            },
            {
                retries: 3,
            }
        )
        expect(result).toBe(true)
    })
    it('should fail after 3 retries', async () => {
        let i = 0
        try {
            await retry(
                async () => {
                    i++
                    throw new Error('error')
                },
                {
                    retries: 3,
                }
            )
            throw new Error('not expected to be here')
        } catch (e) {
            expect(i).toBe(1 + 3)
            expect(e.message).toBe('error')
        }
    })
    it('should fail not fail on target error', async () => {
        let i = 0
        try {
            await retry(
                async () => {
                    i++
                    if (i !== 5) {
                        throw new Error('not an real error')
                    }
                    throw new Error('error')
                },
                {
                    until: (e) => e.message !== 'not an real error',
                }
            )
            throw new Error('not expected to be here')
        } catch (e) {
            expect(i).toBe(1 + 4)
            expect(e.message).toBe('error')
        }
    })
    it('should wait 1000ms/retry', async () => {
        const start = Date.now()
        let i = 0
        try {
            await retry(
                async () => {
                    i++
                    throw new Error('error')
                },
                {
                    retries: 1,
                    delay: 1000,
                }
            )
        } catch (e) {
            const end = Date.now()
            expect(i).toBe(1 + 1)
            expect(end - start).toBeGreaterThanOrEqual(1000 * 1)
        }
    })
})
