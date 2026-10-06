import {PROTOCOL,catalog,execute} from './commands.mjs';
const MODULE='kult-gm-companion';
let panel,frame,port;
function disconnect(){if(port){port.close();port=null;}}
function open() {
  if(!game.user?.isGM){ui.notifications.warn('Companion jest dostępny tylko dla MG.');return;}
  if(panel){panel.hidden=false;return;}
  panel=document.createElement('section');panel.id='kult-companion-panel';panel.setAttribute('aria-label','KULT GM Companion');
  const bar=document.createElement('div');bar.className='kult-companion-bar';
  const title=document.createElement('strong');title.textContent='KULT · GM Companion';
  const minimize=document.createElement('button');minimize.textContent='Wróć do stołu';minimize.onclick=()=>{panel.hidden=true;};
  const close=document.createElement('button');close.textContent='Zamknij panel';close.onclick=()=>{disconnect();panel.remove();panel=null;frame=null;};
  bar.append(title,minimize,close);frame=document.createElement('iframe');frame.title='Panel Mistrza Gry';
  const url=new URL(`modules/${MODULE}/companion/index.html`,document.baseURI);
  url.searchParams.set('world',game.world.id);url.searchParams.set('user',game.user.id);
  frame.src=url.href;panel.append(bar,frame);document.body.append(panel);
}
window.addEventListener('message',event=>{
  if(frame&&event.source===frame.contentWindow&&event.origin===window.location.origin&&event.data?.protocol===PROTOCOL&&event.data?.type==='minimize'){panel.hidden=true;return;}
  if(!frame||event.source!==frame.contentWindow||event.origin!==window.location.origin||event.data?.type!=='connect'||event.data?.protocol!==PROTOCOL||!game.user?.isGM)return;
  disconnect();const channel=new MessageChannel();port=channel.port1;
  // Serialize mutations; a double request ID cannot replay a side effect.
  const seen=new Set();let queue=Promise.resolve();
  port.onmessage=event=>{
    const request=event.data;
    if(!request||typeof request.id!=='string'||request.id.length>100||seen.has(request.id))return;
    seen.add(request.id);if(seen.size>5000)seen.delete(seen.values().next().value);
    const replyPort=port;
    queue=queue.then(async()=>{try{const result=await execute(game,{ChatMessage,JournalEntry,observer:CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER},request);replyPort.postMessage({id:request.id,ok:true,result});}catch(error){replyPort.postMessage({id:request.id,ok:false,error:error.message});}});
  };
  port.start();frame.contentWindow.postMessage({protocol:PROTOCOL,type:'connected',catalog:catalog(game)},window.location.origin,[channel.port2]);
});
function notify(){if(port&&game.user?.isGM)port.postMessage({type:'catalog',catalog:catalog(game)});}
Hooks.once('ready',()=>{
  game.modules.get(MODULE).api={open,close:()=>{disconnect();panel?.remove();panel=null;frame=null;}};
  if(!game.user.isGM)return;
  const launch=document.createElement('button');launch.id='kult-companion-launch';launch.textContent='◈ KULT Companion';launch.title='Otwórz panel MG';launch.onclick=open;document.body.append(launch);
});
for(const hook of ['updateScene','createScene','deleteScene','createJournalEntry','updateJournalEntry','deleteJournalEntry'])Hooks.on(hook,notify);
window.addEventListener('beforeunload',disconnect);
