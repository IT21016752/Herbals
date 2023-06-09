import pino from "pino"

const logger = pino({
    transport: {
        target: 'pino-pretty',

        options: {
            colorize: true,
            translateTime: true,
            ignore: 'hostname,pid'
        }
    }
})

export default logger;