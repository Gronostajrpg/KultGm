// Foundry stores this workspace on the currently authenticated GM's user document.
const serverSave={ready:false,remote:null,revision:0,status:'Lokalna kopia w przeglądarce',timer:null,busy:false,dirty:false};
const localPersist=persist;
persist=function(){localPersist();if(serverSave.ready){serverSave.dirty=true;scheduleServerSave();}};
function scheduleServerSave(){clearTimeout(serverSave.timer);serverSave.timer=setTimeout(saveOnServer,900);}
function storageMarkup(){return `<div class="notice"><strong>Zapis MG</strong><p id="server-save-status">${esc(serverSave.status)}</p>${serverSave.remote&&!serverSave.ready?'<p>Znaleziono zapis na tym serwerze dla Twojego konta MG. Wybierz, które dane chcesz używać. Najpierw możesz wykonać Kopię sesji.</p><button type="button" data-storage="load">Wczytaj z serwera</button> <button type="button" data-storage="keep">Zapisz obecną kopię na serwerze</button>':''}${serverSave.ready?'<button type="button" data-storage="save">Zapisz teraz</button> <button type="button" data-storage="reload">Wczytaj zapis serwera</button>':''}${!serverSave.ready&&!serverSave.remote?'<button type="button" data-storage="retry">Sprawdź zapis serwera</button>':''}<p class="source">Każdy serwer Foundry ma oddzielny zapis, przypisany do konta MG. W tej przeglądarce pozostaje kopia awaryjna. Inni MG na tym samym serwerze mają uprawnienia administracyjne — ten zapis nie chroni przed nimi.</p></div>`;}
function storageStatus(text){serverSave.status=text;const el=$('#server-save-status');if(el)el.textContent=text;}
async function initializeServerSave(){
  clearTimeout(serverSave.timer);serverSave.ready=false;
  try{const saved=await foundryRequest('loadCompanion');if(saved){validateDB(saved.data);serverSave.remote=saved;serverSave.revision=saved.revision;storageStatus('Dostępna kopia na serwerze · '+new Date(saved.at).toLocaleString('pl-PL'));render();}
  else{serverSave.remote=null;serverSave.revision=0;serverSave.ready=true;serverSave.dirty=true;await saveOnServer();render();}}
  catch(error){storageStatus('Zapis serwera niedostępny: '+error.message);render();}
}
async function saveOnServer(){
  if(!serverSave.ready||!foundryBridge.port)return;
  if(serverSave.busy){serverSave.dirty=true;return;}
  serverSave.busy=true;serverSave.dirty=false;storageStatus('Zapisywanie na serwerze…');
  try{const result=await foundryRequest('saveCompanion',{data:structuredClone(db),revision:serverSave.revision});serverSave.revision=result.revision;storageStatus('Zapisano na serwerze · '+new Date(result.at).toLocaleString('pl-PL'));}
  catch(error){serverSave.ready=false;serverSave.dirty=false;storageStatus('Pozostała kopia lokalna. '+error.message);render();}
  finally{serverSave.busy=false;if(serverSave.dirty&&serverSave.ready)scheduleServerSave();}
}
const storageRender=render;
render=function(){storageRender();if(!graphGesture&&foundryBridge.catalog)$('#content').insertAdjacentHTML('afterbegin',storageMarkup());};
window.addEventListener('message',e=>{if(e.source===window.parent&&e.origin===location.origin&&e.data?.protocol==='kult-gm-companion-v1'&&e.data?.type==='connected'&&e.ports?.[0])initializeServerSave();});
document.addEventListener('click',async e=>{const button=e.target.closest('[data-storage]');if(!button||serverSave.busy)return;const action=button.dataset.storage;
  if(action==='retry'){await initializeServerSave();return;}
  if(action==='save'){clearTimeout(serverSave.timer);await saveOnServer();return;}
  if(action==='keep'){if(!confirm('Zastąpić zapis na serwerze obecną kopią z przeglądarki?'))return;serverSave.ready=true;serverSave.remote=null;serverSave.dirty=true;await saveOnServer();render();return;}
  if(action==='load'||action==='reload'){if(!confirm('Wczytać scenariusze z serwera i zastąpić lokalną kopię? Możesz wcześniej wykonać Kopię sesji.'))return;clearTimeout(serverSave.timer);button.disabled=true;try{const saved=await foundryRequest('loadCompanion');if(!saved)throw Error('Brak zapisu na serwerze.');const restored=validateDB(saved.data);cancelGraphGesture();db=restored;serverSave.revision=saved.revision;serverSave.remote=null;serverSave.ready=true;serverSave.dirty=false;localPersist();storageStatus('Wczytano zapis serwera · '+new Date(saved.at).toLocaleString('pl-PL'));render();}catch(error){storageStatus(error.message);button.disabled=false;}}
});
render();
