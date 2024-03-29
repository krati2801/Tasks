import { createLogger, transports, format } from "winston";
const { combine, timestamp } = format;

const logger = createLogger({
    format: format.json(),
    transports: [
        new (transports.Console),
        new transports.File({
            level: 'info',
            filename: './logs/response.log',
            format: combine(timestamp())
        }),

        new transports.File({
            level: 'error',
            filename: './logs/error.log',
            format: combine(timestamp())
        })

    ],
});

export default logger