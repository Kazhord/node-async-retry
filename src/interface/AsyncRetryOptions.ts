export default interface AsyncRetryOptions {
    retries?: number
    delay?: number
    until?: (error: Error) => boolean 
}