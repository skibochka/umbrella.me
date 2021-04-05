import { EntityTarget, getConnection, Repository } from 'typeorm';

function model<T>(entity: EntityTarget<T>): Repository<T> {
  return getConnection().getRepository(entity);
}

export {
  model,
};
