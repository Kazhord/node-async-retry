import AsyncRetryOptions from './interface/AsyncRetryOptions'

const retry = async (fn: () => Promise<unknown>, opt: AsyncRetryOptions): Promise<unknown> => {
    try {
        return await fn()
    } catch (e) {
        if (opt.retries && opt.retries > 0) {
            if (opt.delay && opt.delay > 0) {
                await new Promise((resolve) => setTimeout(resolve, opt.delay))
            }
            opt.retries--
            await retry(fn, opt)
        } else if (opt.until && !opt.until(e)) {
            if (opt.delay && opt.delay > 0) {
                await new Promise((resolve) => setTimeout(resolve, opt.delay))
            }
            await retry(fn, opt)
        } else {
            throw e
        }
    }
}

export default retry
