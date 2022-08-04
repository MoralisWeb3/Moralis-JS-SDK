// TODO: replace for proper data store, and remove expired authRequests
export const authRequests = new Map<string, { id: string; profileId: string }>();
