const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const root=require('node:path').resolve(__dirname, '..');
const {stripTypeScriptTypes}=require('node:module');
const json=(body,opts={})=>({body,status:opts.status||200,cookies:{set(){}}});
function compile(path,mocks={}) { let code=stripTypeScriptTypes(fs.readFileSync(root+'/'+path,'utf8')); const names=[...code.matchAll(/export\s+(?:async\s+)?(?:function|const)\s+(\w+)/g)].map(m=>m[1]); code=code.replace(/import\s*\{([\s\S]*?)\}\s*from\s*["']([^"']+)["'];/g,(_,n,p)=>`const {${n}}=require("${p}");`).replace(/export\s+/g,'');code+='\n'+names.map(n=>`exports.${n}=${n};`).join('\n'); const exports={}; vm.runInNewContext(code,{exports,require:n=>mocks[n]||require(n),Buffer,process:{env:{SUPABASE_SERVICE_ROLE_KEY:'test-only-secret',NODE_ENV:'test'}}});return exports; }

const auth=compile('lib/participant-auth.ts',{'next/server':{NextResponse:{json}}});
const id='d17ee266-53f4-4655-a612-b789c6082efe';let cookie;
auth.grantParticipant({cookies:{set:(name,value,options)=>cookie={name,value,options}}},id,'a');
assert.equal(cookie.options.httpOnly,true);
const req={cookies:{get:name=>name===cookie.name?{value:cookie.value}:undefined}};
assert.equal(auth.hasParticipant(req,id,'a'),true);assert.equal(auth.hasParticipant(req,id,'b'),false);assert.equal(auth.hasParticipant(req,'00000000-0000-0000-0000-000000000000','a'),false);
const questions=compile('lib/questions.ts').questions;
const answers=Object.fromEntries(questions.map(q=>[q.id,q.options[0].value]));
let completed=false,insertCount=0,updateFail=false,duplicate=false;const db={from(table){return {select(){return this},eq(){return this},single:async()=>({data:{partner_a_completed:completed,partner_b_completed:false}}),insert:async()=>{insertCount++;return {error:duplicate?{code:'23505'}:null}},update(){return {eq:async()=>({error:updateFail?{message:'failed'}:null})}}}}};
const route=compile('app/api/answers/route.ts',{'next/server':{NextResponse:{json}},'../../../lib/supabase':{admin:()=>db},'../../../lib/participant-auth':auth,'../../../lib/questions':{questions}});
const call=body=>route.POST({...req,json:async()=>body});
(async()=>{
assert.equal((await call({coupleId:id,role:'b',answers})).status,403);
assert.equal((await call({coupleId:id,role:'a',answers:{}})).status,400);
assert.equal((await call({coupleId:id,role:'a',answers:{...answers,[questions[0].id]:'invalid'}})).status,400);
assert.equal(insertCount,0);
assert.equal((await call({coupleId:id,role:'a',answers})).status,200);
completed=true;assert.equal((await call({coupleId:id,role:'a',answers})).status,409);assert.equal(insertCount,1);
completed=false;updateFail=true;assert.equal((await call({coupleId:id,role:'a',answers})).status,500);
console.log('PASS: signed role-bound cookies; unauthorized and incomplete answers rejected; complete submission; completed test protected; completion write failure reported.');
})().catch(e=>{console.error(e);process.exit(1)});
