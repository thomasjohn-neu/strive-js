import winston from 'winston';

export const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    level:'error',
    transports:[
        new winston.transports.File({filename:'error.log',level:'error'})
      ],
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    });

    
// module.exports = logger;