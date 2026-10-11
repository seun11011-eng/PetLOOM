import {useEffect,useMemo,useState} from 'react';
import {products} from '../data/products';
export type CartLine={key:string; productId:string; quantity:number; variants:Record<string,string>};
const STORAGE='petloom-cart-v1';
function readCart():CartLine[]{try{const raw=JSON.parse(localStorage.getItem(STORAGE)||'[]'); if(!Array.isArray(raw))return []; return raw.filter((x:any)=>x&&products.some(p=>p.id===x.productId)&&Number.isInteger(x.quantity)&&x.quantity>0&&x.quantity<=99&&typeof x.variants==='object').map((x:any)=>({key:String(x.key),productId:String(x.productId),quantity:x.quantity,variants:x.variants}));}catch{return [];}}
export function useCart(){const [lines,setLines]=useState<CartLine[]>(()=>readCart());useEffect(()=>{localStorage.setItem(STORAGE,JSON.stringify(lines));},[lines]);const enriched=useMemo(()=>lines.map(l=>({...l,product:products.find(p=>p.id===l.productId)!})).filter(l=>l.product),[lines]);const count=enriched.reduce((n,l)=>n+l.quantity,0);const subtotal=enriched.reduce((n,l)=>n+l.product.price*l.quantity,0);
function add(productId:string,quantity=1,variants:Record<string,string>={}){const key=productId+'-'+Object.entries(variants).sort().map(([k,v])=>k+':'+v).join('|');setLines(old=>{const found=old.find(x=>x.key===key);if(found)return old.map(x=>x.key===key?{...x,quantity:Math.min(99,x.quantity+quantity)}:x);return [...old,{key,productId,quantity,variants}]});}
function setQuantity(key:string,quantity:number){setLines(old=>quantity<1?old.filter(x=>x.key!==key):old.map(x=>x.key===key?{...x,quantity:Math.min(99,quantity)}:x));}
function remove(key:string){setLines(old=>old.filter(x=>x.key!==key));}function clear(){setLines([])}
return {lines:enriched,count,subtotal,add,setQuantity,remove,clear};}
