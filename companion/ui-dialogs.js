let notificationTimer;
function notify(text){const el=document.querySelector('#toast');if(!el)return;el.textContent=text;el.hidden=false;clearTimeout(notificationTimer);notificationTimer=setTimeout(()=>el.hidden=true,7000);}
function askDialog(text,{input=false,choices=[['ok','Potwierdź'],['cancel','Anuluj']]}={}){
 return new Promise(resolve=>{
  const d=document.querySelector('#message'),previous=document.activeElement;
  if(d.open){resolve(null);return;}
  const h=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  d.innerHTML=`<form><h2>${input?'Wprowadź dane':'Potwierdzenie'}</h2><p>${h(text)}</p>${input?'<label>Treść<input name="answer" required maxlength="500" autocomplete="off"></label>':''}<div class="row">${choices.map(([id,label])=>`<button type="${id==='cancel'?'button':'submit'}" name="choice" value="${h(id)}">${h(label)}</button>`).join('')}</div></form>`;
  let done=false;const finish=value=>{if(done)return;done=true;d.close();previous?.isConnected&&previous.focus();resolve(value);};
  d.oncancel=e=>{e.preventDefault();finish(null);};d.querySelector('[value="cancel"]')?.addEventListener('click',()=>finish(null));
  d.querySelector('form').onsubmit=e=>{e.preventDefault();finish(input?d.querySelector('input').value:e.submitter?.value);};
  d.showModal();(d.querySelector('input')||d.querySelector('button'))?.focus();
 });
}
async function uiConfirm(text){return await askDialog(text)==='ok';}
async function uiPrompt(text){return askDialog(text,{input:true});}
