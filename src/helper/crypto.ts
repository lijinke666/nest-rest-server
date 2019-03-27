import * as crypto from 'crypto';

class Crypto {
  public getPassWord(password: string) {
    return crypto
      .createHash('md5')
      .update(password)
      .digest('hex');
  }
}

export default new Crypto();
