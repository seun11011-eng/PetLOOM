export const money = (amount:number) => new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(amount);
export const WHATSAPP_NUMBER = '2349030236409';
export const CUSTOMER_EMAIL = 'seun11011@gmail.com';
export function makeOrderReference(){ return `PL-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${Math.random().toString(36).slice(2,6).toUpperCase()}`; }
