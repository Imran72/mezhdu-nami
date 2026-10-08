const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const root=require('node:path').resolve(__dirname,'..');const {stripTypeScriptTypes}=require('node:module');
const id='d17ee266-53f4-4655-a612-b789c6082efe',pid='00000000-0000-0000-0000-000000000001';
function compile(path,mocks={},globals={}){let code=stripTypeScriptTypes(fs.readFileSync(root+'/'+path,'utf8'));const names=[...code.matchAll(/export\s+(?:async\s+)?(?:function|const)\s+(\w+)/g)].map(m=>m[1]);code=code.replace(/import\s*\{([\s\S]*?)\}\s*from\s*["']([^"']+)["'];/g,(_,n,p)=>`const {${n}}=require("${p}");`).replace(/import\s+(\w+)\s+from\s*['"]([^'"]+)['"];?/g,(_,n,p)=>`const ${n}=require("${p}");`).replace(/export\s*\{[^}]+\}\s*from\s*['"][^'"]+['"];?/g,'').replace(/export\s+/g,'');code+='\n'+names.map(n=>`exports.${n}=${n};`).join('\n');const exports={};vm.runInNewContext(code,{exports,require:n=>mocks[n]||require(n),Buffer,URL,process:{env:{YOOKASSA_SHOP_ID:'test-shop',YOOKASSA_SECRET_KEY:'test-secret'}},...globals});return exports;}
const json=(body,opts={})=>({body,status:opts.status||200,cookies:{set(){}}});
let paid=false,writeFail=false,writes=0,requestBody,fetchCount=0;
const db={from(table){return {select(){return this},eq(){return this},single:async()=>({data:{id,paid,partner_a_completed:true,partner_b_completed:true}}),then(resolve){resolve({data:[]})},upsert:async()=>({error:writeFail?{}:null}),update(){writes++;return {eq:async()=>({error:writeFail?{}:null})}}}}};
const validId=x=>typeof x==='string'&&/^[a-f0-9-]{36}$/.test(x);
let payment={id:pid,metadata:{coupleId:id},status:'succeeded',paid:true,amount:{value:'99.00',currency:'RUB'}};
const lib=compile('lib/payment.ts',{'./supabase':{admin:()=>db},'./participant-auth':{validId},'./plan-price':compile('lib/plan-price.ts')},{fetch:async()=>({ok:true,json:async()=>payment})});
lib.PLAN_PRICE=compile('lib/plan-price.ts').PLAN_PRICE;
const route=compile('app/api/payment/route.ts',{'next/server':{NextResponse:{json}},'../../../lib/supabase':{admin:()=>db},'../../../lib/participant-auth':{validId},'../../../lib/payment':lib},{fetch:async(url,options)=>{fetchCount++;requestBody=JSON.parse(options.body);return {ok:true,json:async()=>({id:pid,confirmation:{confirmation_url:'https://yookassa.ru/test-payment'}})}}});
const report=compile('app/api/report/route.ts',{'next/server':{NextResponse:{json}},'../../../lib/supabase':{admin:()=>db},'../../../lib/scoring':{score:()=>({scores:{}})},'openai':class{},'../../../lib/payment':lib,'../../../lib/participant-auth':{validId}});
(async()=>{
assert.equal((await route.POST({json:async()=>({coupleId:'bad'})})).status,400);
assert.equal((await route.POST({url:'http://localhost:3000/api/payment',json:async()=>({coupleId:id})})).status,200);
assert.equal(requestBody.amount.value,'99.00');assert.equal(requestBody.amount.currency,'RUB');assert.equal(requestBody.confirmation.return_url,`http://localhost:3000/report/${id}`);
paid=true;await route.POST({json:async()=>({coupleId:id})});assert.equal(fetchCount,1);paid=false;
assert.equal((await report.GET({url:`http://localhost/api/report?id=${id}&full=1`,cookies:{get:()=>undefined}})).status,402);
assert.equal((await report.GET({url:`http://localhost/api/report?id=${id}`,cookies:{get:()=>undefined}})).status,200);
assert.equal(await lib.confirmPayment(pid,id),true);assert.equal(writes,1);
payment.amount.value='299.00';assert.equal(await lib.confirmPayment(pid,id),false);assert.equal(writes,1);
payment.amount.value='99.00';payment.amount.currency='USD';assert.equal(await lib.confirmPayment(pid,id),false);
payment.amount.currency='RUB';payment.status='pending';assert.equal(await lib.confirmPayment(pid,id),false);
payment.status='succeeded';assert.equal(await lib.confirmPayment(pid,'00000000-0000-0000-0000-000000000002'),false);
assert.equal((await report.GET({url:`http://localhost/api/report?id=${id}&full=1`,cookies:{get:()=>({value:pid})}})).status,200);
writeFail=true;await assert.rejects(()=>lib.confirmPayment(pid,id));
console.log('PASS: 99 RUB checkout, paid pairs do not pay twice, unpaid report blocked, return verification, wrong amounts/currencies/pairs and pending payments rejected, DB failures reported.');
})().catch(e=>{console.error(e);process.exit(1)});
