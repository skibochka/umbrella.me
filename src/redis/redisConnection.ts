import * as Redis from 'ioredis';
import { redisConfiguration } from '../config/redis';

let redis: Redis = null;

export default function redisConnection(): Redis {
  if (!redis) {
    redis = new Redis(`redis://${redisConfiguration.redisUrl}:${redisConfiguration.redisPort}`);
    return redis;
  }
  return redis;
}
