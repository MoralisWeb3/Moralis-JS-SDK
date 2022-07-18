import { requestMessage, verifyMessage } from './authService';

export async function request(req, res, next) {
  try {
    const { address, chain, network } = req.body;

    const message = await requestMessage({
      address,
      chain,
      network,
    });

    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
}

export async function verify(req, res, next) {
  try {
    const { network, message, signature } = req.body;

    const user = await verifyMessage({
      network,
      message,
      signature,
    });

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
}
