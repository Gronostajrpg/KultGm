export const PROTOCOL = 'kult-gm-companion-v1';
export function plainHTML(text) {
  return String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])).replace(/\r?\n/g,'<br>');
}
function text(value, max=20000) {
  if (typeof value !== 'string' || !value.trim() || value.length > max) throw Error('Nieprawidłowy lub zbyt długi tekst.');
  return value;
}
export function catalog(game) {
  if (!game.user?.isGM) throw Error('Połączenie wymaga zalogowanego MG.');
  return {
    world: game.world.id, user: game.user.name, version: game.version,
    activeScene: game.scenes.active?.id || '',
    scenes: game.scenes.contents.map(s => ({id:s.id,name:s.name})),
    journals: game.journal.contents.map(j => ({id:j.id,name:j.name}))
  };
}
export async function execute(game, api, request) {
  if (!game.user?.isGM) throw Error('Tylko MG może wykonywać te działania.');
  const {action,payload={}} = request;
  if (action==='catalog') return catalog(game);
  if (action==='loadCompanion') {
    return game.user.getFlag('kult-gm-companion','workspace') || null;
  }
  if (action==='saveCompanion') {
    const data=payload.data;
    if(data?.version!==1||!Array.isArray(data.scenarios)||!data.scenarios.length||!data.scenarios.some(s=>s.id===data.active)||JSON.stringify(data).length>10000000)throw Error('Nieprawidłowa lub zbyt duża kopia scenariuszy.');
    const previous=game.user.getFlag('kult-gm-companion','workspace');
    if((previous?.revision||0)!==payload.revision)throw Error('Na serwerze jest nowszy zapis. Wczytaj go lub wykonaj lokalny eksport przed ponownym zapisem.');
    const saved={revision:(previous?.revision||0)+1,at:new Date().toISOString(),data:structuredClone(data)};
    // Server-owned user document; never accepts another user or world from the frame.
    await game.user.setFlag('kult-gm-companion','workspace',saved);
    return {revision:saved.revision,at:saved.at};
  }
  if (action==='activateScene') {
    const scene=game.scenes.get(text(payload.id,100));
    if (!scene) throw Error('Scena nie istnieje w tym świecie.');
    await scene.activate();
    return {name:scene.name,activeScene:scene.id};
  }
  if (action==='chat') {
    const message=await api.ChatMessage.create({user:game.user.id,content:`<div class="kult-player-description"><strong>${plainHTML(text(payload.title,180))}</strong><p>${plainHTML(text(payload.text))}</p></div>`});
    return {id:message.id};
  }
  if (action==='handout') {
    // Only the explicit player-facing title and text become a shared journal.
    const journal=await api.JournalEntry.create({name:text(payload.title,180),ownership:{default:api.observer},pages:[{name:payload.title,type:'text',text:{format:1,content:`<p>${plainHTML(text(payload.text))}</p>`}}]});
    try { await journal.show(true); }
    catch { return {id:journal.id,warning:'Handout utworzono, ale nie udało się go wyświetlić. Otwórz go w dziennikach Foundry.'}; }
    return {id:journal.id};
  }
  if (action==='showJournal') {
    const journal=game.journal.get(text(payload.id,100));
    if (!journal) throw Error('Dziennik nie istnieje w tym świecie.');
    await journal.show(true);
    return {name:journal.name};
  }
  if (action==='previewJournal') {
    const journal=game.journal.get(text(payload.id,100));
    if (!journal) throw Error('Dziennik nie istnieje w tym świecie.');
    journal.sheet.render(true);
    return {name:journal.name};
  }
  throw Error('Nieobsługiwane polecenie.');
}
