export class Limiter {
  constructor({ windowMs = 1, requestLimit = 2, Moralis }) {
    if (!Moralis) throw new Error('Web3Api.limiter failed: A moralis instance is required');
    this.windowMs = windowMs;
    this.requestLimit = requestLimit;
    this.Moralis = Moralis;
  }

  static UpdateOperation = {
    increment: 'increment',
    restart: 'restart',
  };

  static limitHit(firstRequestTime) {
    const startDate = new Date(firstRequestTime);
    const endDate = new Date();
    const diff = endDate.getTime() - startDate.getTime();
    const diffInMin = Math.floor(diff / 60000);
    return diffInMin;
  }

  // Check db for request status of user either by IP or username
  static async checkStatus(identifier) {
    const currentData = await this.dbQuery(identifier);
    const { firstRequestTime, requestCount } = currentData.attributes;
    const limit = this.limitHit(firstRequestTime);
    let response;
    if (limit > this.windowMs) {
      await this.updateDb(currentData, this.UpdateOperation.restart);
      response = true;
    } else if (limit < this.windowMs && requestCount < this.requestLimit) {
      await this.updateDb(currentData, this.UpdateOperation.increment);
      response = true;
    } else {
      response = false;
    }
    return response;
  }

  static async dbQuery(identifier) {
    try {
      const rateLimits = this.Moralis.Object.extend('RateLimits');
      const query = new this.Moralis.Query(rateLimits);
      query.equalTo('identifier', identifier);
      const results = await query.find();
      if (results.length === 0) {
        const data = new rateLimits();
        data.set('identifier', identifier);
        data.set('requestCount', 1);
        data.set('firstRequestTime', new Date());
        await data.save();
        return data;
      }
      return results[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateDb(data, operation) {
    try {
      const result = await this.dbQuery(data.attributes.identifier);
      if (operation === this.UpdateOperation.increment) {
        result.set('requestCount', Number(result.attributes.requestCount) + 1);
      } else {
        result.set('requestCount', 1);
        result.set('firstRequestTime', new Date());
      }
      await result.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  static async beforeAPIRequest() {
    const user = this.Moralis.User.current();
    // eslint-disable-next-line no-console
    console.log('user', user);
    if (user) {
      return this.checkStatus(user.attributes.username);
    }
    // const ip = await axios.get('https://api.ipify.org/?format=json').data;
    // return this.checkStatus(ip.ip);
  }
}

/**
 * Table structure.
 *  -identifier
 *  -requestCount
 *  -firstRequestTime
 *  -updatedAt
 */
