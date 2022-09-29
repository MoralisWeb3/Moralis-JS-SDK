import { NextFunction, Request, Response } from 'express';
import { addStream, deleteStream, getStreams, updateStream } from './streamService';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { webhookUrl } = req.body;

    const result = await addStream({
      networkType: 'evm',
      webhookUrl,
    });

    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const message = await getStreams();

    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { webhookUrl } = req.body;
    const { id } = req.params;

    const message = await updateStream(id, {
      networkType: 'evm',
      webhookUrl,
    });

    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
}

export async function del(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const message = await deleteStream(id);

    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
}
