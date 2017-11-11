import hash from '../../../libs/hash';

const sanitize = event => {
  // TODO: VALIDATE EVENT FORMAT

  event.uuid = hash(JSON.stringify(event));
  return event;
};

export default sanitize;
