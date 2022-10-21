import { Router } from 'express';
import { 
  // Resolvers import
streamsGetSettingsResolver,
streamsSetSettingsResolver,
streamsReplayHistoryResolver,
streamsGetHistoryResolver,
streamsDeleteAddressFromStreamResolver,
streamsGetAddressesResolver,
streamsAddAddressToStreamResolver,
streamsUpdateStreamStatusResolver,
streamsGetStreamResolver,
streamsGetStreamsResolver,
streamsDeleteStreamResolver,
streamsUpdateStreamResolver,
streamsCreateStreamResolver,
} from './resolvers';

export class streamsRouter {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public getRouter() {
    const router = Router();

    // Routes
    router.get("/settings", (req, res, next) =>  streamsGetSettingsResolver(req, res, next, this.apiKey))
    router.post("/settings", (req, res, next) =>  streamsSetSettingsResolver(req, res, next, this.apiKey))
    router.post("/history/replay/:streamId/:id", (req, res, next) =>  streamsReplayHistoryResolver(req, res, next, this.apiKey))
    router.get("/history", (req, res, next) =>  streamsGetHistoryResolver(req, res, next, this.apiKey))
    router.delete("/streams/evm/undefined/address", (req, res, next) =>  streamsDeleteAddressFromStreamResolver(req, res, next, this.apiKey))
    router.get("/streams/evm/undefined/address", (req, res, next) =>  streamsGetAddressesResolver(req, res, next, this.apiKey))
    router.post("/streams/evm/undefined/address", (req, res, next) =>  streamsAddAddressToStreamResolver(req, res, next, this.apiKey))
    router.post("/streams/evm/undefined/status", (req, res, next) =>  streamsUpdateStreamStatusResolver(req, res, next, this.apiKey))
    router.get("/streams/evm", (req, res, next) =>  streamsGetStreamResolver(req, res, next, this.apiKey))
    router.get("/streams/evm", (req, res, next) =>  streamsGetStreamsResolver(req, res, next, this.apiKey))
    router.delete("/streams/evm/undefined", (req, res, next) =>  streamsDeleteStreamResolver(req, res, next, this.apiKey))
    router.post("/streams/evm/undefined", (req, res, next) =>  streamsUpdateStreamResolver(req, res, next, this.apiKey))
    router.put("/streams/evm", (req, res, next) =>  streamsCreateStreamResolver(req, res, next, this.apiKey))
  
    return router;
  }
}
