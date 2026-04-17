const BASE = "/settlements";

export const getSettlements = BASE;
export const getSummary = `${BASE}/summary`;
export const getOne = (id) => `${BASE}/${id}`;
export const getBySeller = (sellerId) => `${BASE}/seller/${sellerId}`;
export const createSettlement = BASE;
export const addPayment = (id) => `${BASE}/${id}/payments`;
