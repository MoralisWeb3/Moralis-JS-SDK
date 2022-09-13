/* eslint-disable no-console */
import express, { NextFunction, Request, Response } from 'express';
import config from './config';
import fs from 'fs';
import Web3Utils from 'web3-utils';

async function webHook(req: Request, res: Response, next: NextFunction) {
  try {
    verifySignature(req);
    // Handle data
    writeTofile(req.body);

    res.status(200).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
}

function writeTofile(data: any) {
  const content = {
    timestamp: new Date().toISOString(),
    data,
  };
  fs.readFile('data.json', 'utf8', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const objectifiedData = result ? JSON.parse(result) : [];
      objectifiedData.push(content);
      const json = JSON.stringify(objectifiedData);
      fs.writeFile('data.json', json, 'utf8', (error) => {
        if (error) {
          console.log(err);
        }
      });
    }
  });
}

function verifySignature(req: Request) {
  const providedSignature = req.headers['x-signature'];
  if (!providedSignature) {
    throw new Error('No signature provided');
  }
  const generatedSignature = Web3Utils.sha3(JSON.stringify(req.body) + config.STREAM_SECRET);
  if (providedSignature !== generatedSignature) {
    throw new Error('Invalid signature');
  }

  // eslint-disable-next-line no-console
  console.log('Signature verified');
}

async function getEvents(req: Request, res: Response, next: NextFunction) {
  try {
    fs.readFile('data.json', 'utf8', (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const objectifiedData = result ? JSON.parse(result) : [];
        res.status(200).json(objectifiedData);
      }
    });
  } catch (err) {
    next(err);
  }
}

export const hookRouter = express.Router();

hookRouter.route('/stream').post(webHook);
hookRouter.route('/get').get(getEvents);
