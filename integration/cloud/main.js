/* global Parse */
Parse.Cloud.define('bar', request => {
  if (request.params.key2 === 'value1') {
    return 'Foo';
  }
  throw 'bad stuff happened';
});

Parse.Cloud.define('TestFetchFromLocalDatastore', request => {
  const object = new Parse.Object('Item');
  object.id = request.params.id;
  object.set('foo', 'changed');
  return object.save();
});

Parse.Cloud.define('UpdateUser', request => {
  const user = new Parse.User();
  user.id = request.params.id;
  user.set('foo', 'changed');
  return user.save(null, { useMasterKey: true });
});

Parse.Cloud.define('CloudFunctionIdempotency', () => {
  const object = new Parse.Object('IdempotencyItem');
  return object.save(null, { useMasterKey: true });
});

Parse.Cloud.define('CloudFunctionUndefined', () => {
  return undefined;
});

Parse.Cloud.job('CloudJob1', () => {
  return {
    status: 'cloud job completed',
  };
});

Parse.Cloud.job('CloudJob2', () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: 'cloud job completed',
      });
    }, 1000);
  });
});

Parse.Cloud.job('CloudJobFailing', () => {
  throw 'cloud job failed';
});
