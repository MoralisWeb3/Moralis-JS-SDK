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

export const streamsRouter = Router();

// Routes
streamsRouter.get("/settings", streamsGetSettingsResolver)
streamsRouter.post("/settings", streamsSetSettingsResolver)
streamsRouter.post("/history/replay/:streamId/:id", streamsReplayHistoryResolver)
streamsRouter.get("/history", streamsGetHistoryResolver)
streamsRouter.delete("/streams/evm/undefined/address", streamsDeleteAddressFromStreamResolver)
streamsRouter.get("/streams/evm/undefined/address", streamsGetAddressesResolver)
streamsRouter.post("/streams/evm/undefined/address", streamsAddAddressToStreamResolver)
streamsRouter.post("/streams/evm/undefined/status", streamsUpdateStreamStatusResolver)
streamsRouter.get("/streams/evm", streamsGetStreamResolver)
streamsRouter.get("/streams/evm", streamsGetStreamsResolver)
streamsRouter.delete("/streams/evm/undefined", streamsDeleteStreamResolver)
streamsRouter.post("/streams/evm/undefined", streamsUpdateStreamResolver)
streamsRouter.put("/streams/evm", streamsCreateStreamResolver)