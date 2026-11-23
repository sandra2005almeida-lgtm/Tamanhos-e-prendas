// Lógica: renderização, guardar, separadores, perguntas
const $=id=>document.getElementById(id);
const key=(i,k)=>i+"."+k;
const filled=v=>Array.isArray(v)?v.length>0:(v!==undefined&&String(v).trim()!=="");
function mk(tag,cls,txt){const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e}
const mkF=(id,S,path,ls)=>({id,S,A:{},ref:null,d:false,w:false,r:false,t:null,path,ls});
const FM={ele:mkF("ele",S_ELE,"ficha/respostas","ficha-tamanhos"),ela:mkF("ela",S_ELA,"respostas/ficha","ficha-sandra")};
let cur="ele",view="fill",db=null,isOwner=false,Q=[];
const F=()=>FM[cur];
const canEdit=f=>f.id==="ele"||isOwner;
const customOf=(f,si)=>(f.A._items||[]).filter(c=>c.s===si).map(c=>({id:c.id,t:c.t,c:1,f:[A_("q","Detalhes")]}));
const itemsOf=f=>f.S.flatMap((s,si)=>s.i.concat(customOf(f,si)));
const itemDone=(f,id)=>Object.keys(f.A).some(k=>k.indexOf(id+".")===0&&filled(f.A[k]));
function status(t,ok){const s=$("status");s.textContent=t;s.className="status"+(ok?" ok":"")}
function save(f){
  f.d=true;status("A guardar…");updateProg();
  try{localStorage.setItem(f.ls,JSON.stringify(f.A))}catch(e){}
  clearTimeout(f.t);f.t=setTimeout(()=>flush(f),700);
}
async function flush(f){
  if(!f.ref){status("Guardado só neste dispositivo");return}
  if(f.w){f.r=true;return}
  f.w=true;f.d=false;
  try{await f.ref.set({a:f.A,u:Date.now()});status("Guardado ✓",true)}
  catch(e){f.d=true;status("Não foi possível guardar. Verifica a ligação.")}
  f.w=false;if(f.r){f.r=false;flush(f)}
}
function updateProg(){
  const f=F(),its=itemsOf(f),n=its.filter(i=>itemDone(f,i.id)).length;
  $("prog").style.width=(its.length?100*n/its.length:0)+"%";
  $("count").textContent=n+" de "+its.length+" itens com resposta";
  document.querySelectorAll(".card[data-id]").forEach(c=>c.classList.toggle("done",itemDone(f,c.dataset.id)));
}
function rerender(){const y=window.scrollY;renderForm();window.scrollTo(0,y)}
function inlineAdd(btn,ph,onOk){
  const w=mk("span","addw"),inp=document.createElement("input");inp.type="text";inp.placeholder=ph;inp.className="mini";
  const ok=mk("button","chip","OK");ok.type="button";
  const go=()=>{const v=inp.value.trim();if(v)onOk(v)};
  ok.addEventListener("click",go);inp.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();go()}});
  btn.replaceWith(w);w.appendChild(inp);w.appendChild(ok);inp.focus();
}
function field(f,it,fd){
  const k=key(it.id,fd.k),w=mk("div","fld");
  if(fd.y==="t"||fd.y==="a"){
    const id="f_"+k.replace(/\./g,"_");const l=mk("label","",fd.l);l.htmlFor=id;w.appendChild(l);
    const inp=fd.y==="t"?document.createElement("input"):document.createElement("textarea");
    if(fd.y==="t")inp.type="text";inp.id=id;inp.value=f.A[k]||"";inp.placeholder=fd.ph||"";
    inp.addEventListener("input",()=>{f.A[k]=inp.value;save(f)});w.appendChild(inp);return w;
  }
  w.appendChild(mk("div","lab",fd.l));const ch=mk("div","chips");
  const ok="opt."+k,extra=f.A[ok]||[];
  const sync=()=>ch.querySelectorAll("button.chip[data-o]").forEach(z=>z.setAttribute("aria-pressed",fd.y==="c"?f.A[k]===z.dataset.o:(f.A[k]||[]).includes(z.dataset.o)));
  fd.o.concat(extra).forEach(o=>{
    const b=mk("button","chip",o);b.type="button";b.dataset.o=o;
    b.addEventListener("click",()=>{
      if(fd.y==="c")f.A[k]=f.A[k]===o?"":o;
      else{const a=(f.A[k]||[]).slice(),x=a.indexOf(o);x>=0?a.splice(x,1):a.push(o);f.A[k]=a}
      sync();save(f);
    });
    if(extra.indexOf(o)<0){ch.appendChild(b);return}
    const wr=mk("span","cw"),x=mk("button","cx","×");x.type="button";x.title="Remover esta opção";
    x.addEventListener("click",()=>{
      f.A[ok]=extra.filter(z=>z!==o);
      if(fd.y==="c"){if(f.A[k]===o)f.A[k]=""}else f.A[k]=(f.A[k]||[]).filter(z=>z!==o);
      save(f);rerender();
    });
    wr.appendChild(b);wr.appendChild(x);ch.appendChild(wr);
  });
  const plus=mk("button","chip plus","+ Acrescentar");plus.type="button";
  plus.addEventListener("click",()=>inlineAdd(plus,"Nova opção",v=>{
    const a=(f.A[ok]||[]).slice();if(a.indexOf(v)<0&&fd.o.indexOf(v)<0)a.push(v);f.A[ok]=a;
    if(fd.y==="c")f.A[k]=v;else{const s=(f.A[k]||[]).slice();if(s.indexOf(v)<0)s.push(v);f.A[k]=s}
    save(f);rerender();
  }));
  ch.appendChild(plus);w.appendChild(ch);sync();return w;
}
function card(f,it){
  const c=mk("section","card");c.dataset.id=it.id;c.appendChild(mk("h3","",it.t));
  it.f.forEach(fd=>c.appendChild(field(f,it,fd)));
  if(it.id!=="outras"){
    const nk=key(it.id,"nota"),n=mk("div","fld note"),id="n_"+it.id;
    const l=mk("label","","Notas: algo em especial de que gostes / coisas importantes a saber");l.htmlFor=id;n.appendChild(l);
    const ta=document.createElement("textarea");ta.id=id;ta.value=f.A[nk]||"";ta.placeholder="Ex.: marca, cor, material, detalhe…";
    ta.addEventListener("input",()=>{f.A[nk]=ta.value;save(f)});n.appendChild(ta);c.appendChild(n);
  }
  if(it.c){
    const r=mk("button","txt","Remover este item");r.type="button";
    r.addEventListener("click",()=>{
      f.A._items=(f.A._items||[]).filter(z=>z.id!==it.id);
      Object.keys(f.A).forEach(k=>{if(k.indexOf(it.id+".")===0||k.indexOf("opt."+it.id+".")===0)delete f.A[k]});
      save(f);rerender();
    });c.appendChild(r);
  }
  return c;
}
function renderForm(){
  const f=F(),root=$("form");root.textContent="";
  f.S.forEach((s,si)=>{
    const h=mk("h2","sec");h.appendChild(mk("span","",s.e));h.appendChild(document.createTextNode(s.t));root.appendChild(h);
    s.i.concat(customOf(f,si)).forEach(it=>root.appendChild(card(f,it)));
    const ad=mk("div","add"),b=mk("button","chip plus","+ Acrescentar item");b.type="button";
    b.addEventListener("click",()=>inlineAdd(b,"Nome do item",v=>{
      f.A._items=(f.A._items||[]).concat([{id:"c"+Date.now().toString(36),s:si,t:v}]);save(f);rerender();
    }));
    ad.appendChild(b);root.appendChild(ad);
  });
  updateProg();
}
function lines(f,it){
  const out=[];
  it.f.forEach(fd=>{const v=f.A[key(it.id,fd.k)];if(filled(v))out.push([fd.l,Array.isArray(v)?v.join(", "):v])});
  const n=f.A[key(it.id,"nota")];if(filled(n))out.push(["Notas",n]);
  return out;
}
function renderSum(){
  const f=F(),root=$("sum");root.textContent="";let any=false;
  f.S.forEach((s,si)=>{
    const its=s.i.concat(customOf(f,si)).map(i=>[i,lines(f,i)]).filter(x=>x[1].length);
    if(!its.length)return;any=true;
    const h=mk("h2","sec");h.appendChild(mk("span","",s.e));h.appendChild(document.createTextNode(s.t));root.appendChild(h);
    its.forEach(([it,ls])=>{
      const c=mk("div","card");c.appendChild(mk("h3","",it.t));const dl=mk("dl");
      ls.forEach(([a,b])=>{dl.appendChild(mk("dt",a==="Notas"?"nt":"",a));dl.appendChild(mk("dd","",b))});
      c.appendChild(dl);root.appendChild(c);
    });
  });
  if(cur==="ela"&&Q.length){any=true;const h=mk("h2","sec");h.appendChild(mk("span","","💬"));h.appendChild(document.createTextNode("Perguntas dele"));root.appendChild(h);
    Q.forEach(q=>{const c=mk("div","card");c.appendChild(mk("h3","",q.t));const a=f.A["extra."+q.id];c.appendChild(mk("div",filled(a)?"":"status",filled(a)?a:"Por responder"));root.appendChild(c)})}
  if(!any)root.appendChild(mk("p","empty","Ainda não há respostas."));
  else{const b=mk("button","btn","Descarregar respostas (.txt)");b.type="button";b.addEventListener("click",download);root.insertBefore(b,root.firstChild)}
}
async function download(){
  const f=F();let t="FICHA "+(cur==="ele"?"DELE":"DELA")+"\n\n";
  f.S.forEach((s,si)=>s.i.concat(customOf(f,si)).forEach(it=>{const ls=lines(f,it);if(!ls.length)return;t+=it.t.toUpperCase()+"\n";ls.forEach(([a,b])=>{t+="- "+a+": "+b+"\n"});t+="\n"}));
  if(cur==="ela")Q.forEach(q=>{t+="PERGUNTA: "+q.t+"\n"+(filled(f.A["extra."+q.id])?f.A["extra."+q.id]:"(por responder)")+"\n\n"});
  try{const d=await claude.use("downloads");if(d)await d.save({filename:"ficha-"+cur+".txt",data:t})}catch(e){}
}
function renderExtra(){
  const root=$("extra");root.textContent="";const f=FM.ela;
  if(cur!=="ela"||!isOwner||!Q.length)return;
  const sec=(t,e)=>{const h=mk("h2","sec");h.appendChild(mk("span","",e));h.appendChild(document.createTextNode(t));root.appendChild(h)};
  const cd=q=>{const c=mk("section","card");c.appendChild(mk("h3","",q.t));const k="extra."+q.id;
    const ta=document.createElement("textarea");ta.value=f.A[k]||"";ta.placeholder="A tua resposta";
    ta.addEventListener("input",()=>{f.A[k]=ta.value;save(f)});ta.addEventListener("change",()=>{renderExtra()});c.appendChild(ta);root.appendChild(c)};
  const pend=Q.filter(q=>!filled(f.A["extra."+q.id])),done=Q.filter(q=>filled(f.A["extra."+q.id]));
  if(pend.length){sec("Perguntas dele por responder","💬");pend.forEach(cd)}
  if(done.length){sec("Respondidas","✅");done.forEach(cd)}
}
function renderAsk(){
  const root=$("ask");root.textContent="";
  const box=mk("div","card");box.appendChild(mk("h3","","Queres saber mais alguma coisa?"));
  const inp=document.createElement("input");inp.type="text";inp.placeholder="Escreve a pergunta ou o que queres que ela acrescente";
  const b=mk("button","btn","Enviar");b.type="button";b.style.marginTop="10px";
  b.addEventListener("click",async()=>{
    const t=inp.value.trim();if(!t||!db)return;b.disabled=true;
    try{await db.collection("perguntas").add({t,ts:Date.now()});inp.value="";status("Pergunta enviada ✓",true)}
    catch(e){status("Não foi possível enviar.")}
    b.disabled=false});
  box.appendChild(inp);box.appendChild(b);root.appendChild(box);
  Q.forEach(q=>{const c=mk("div","card");c.appendChild(mk("h3","",q.t));
    c.appendChild(mk("div","status",filled(FM.ela.A["extra."+q.id])?"Respondida":"Por responder"));root.appendChild(c)});
}
function syncUI(){
  const f=F(),ce=canEdit(f),ca=cur==="ela"&&!isOwner;
  if(view==="fill"&&!ce)view="view";if(view==="ask"&&!ca)view="view";
  $("tEle").setAttribute("aria-pressed",cur==="ele");$("tEla").setAttribute("aria-pressed",cur==="ela");
  $("tFill").classList.toggle("hide",!ce);$("tAsk").classList.toggle("hide",!ca);
  $("tFill").setAttribute("aria-pressed",view==="fill");$("tView").setAttribute("aria-pressed",view==="view");$("tAsk").setAttribute("aria-pressed",view==="ask");
  $("form").classList.toggle("hide",view!=="fill");$("extra").classList.toggle("hide",view!=="fill");
  $("sum").classList.toggle("hide",view!=="view");$("ask").classList.toggle("hide",view!=="ask");
  $("h1").innerHTML=cur==="ele"?"Ficha <em>dele</em>":"Ficha <em>dela</em>";
  $("lead").textContent=cur==="ele"?"Tamanhos, gostos e manias. Cada item tem espaço para notas e podes acrescentar opções (cores, estilos…) com o “+”.":(isOwner?"Preenche ao teu ritmo. Podes acrescentar opções e itens sempre que quiseres.":"As respostas dela. Se quiseres saber mais alguma coisa, deixa uma pergunta em “Perguntar”.");
  if(view==="fill"){renderForm();renderExtra()}else if(view==="view")renderSum();else renderAsk();
  updateProg();
}
const typing=()=>{const a=document.activeElement;return a&&(a.tagName==="INPUT"||a.tagName==="TEXTAREA")};
$("tEle").addEventListener("click",()=>{cur="ele";syncUI();window.scrollTo(0,0)});
$("tEla").addEventListener("click",()=>{cur="ela";syncUI();window.scrollTo(0,0)});
$("tFill").addEventListener("click",()=>{view="fill";syncUI();window.scrollTo(0,0)});
$("tView").addEventListener("click",()=>{view="view";syncUI();window.scrollTo(0,0)});
$("tAsk").addEventListener("click",()=>{view="ask";syncUI();window.scrollTo(0,0)});
(async()=>{
  try{const user=await claude.use("user");isOwner=!!(user&&await user.isOwner())}catch(e){}
  cur=isOwner?"ela":"ele";
  Object.values(FM).forEach(f=>{if(canEdit(f)){try{const l=JSON.parse(localStorage.getItem(f.ls)||"null");if(l&&typeof l==="object")f.A=l}catch(e){}}});
  view=canEdit(F())?"fill":"view";
  syncUI();
  try{
    db=await claude.use("db");
    if(!db){status("Guardado só neste dispositivo");return}
    status("Pronto");
    db.collection("perguntas").onSnapshot(s=>{
      Q=s.docs.map(d=>Object.assign({id:d.id},d.data())).sort((x,y)=>(x.ts||0)-(y.ts||0));
      if(cur==="ela"&&!typing())syncUI();
    },()=>{});
    Object.values(FM).forEach(f=>{
      f.ref=db.doc(f.path);
      f.ref.onSnapshot(snap=>{
        if(!snap.exists||f.d||f.w)return;
        const d=snap.data();
        if(d&&d.a){f.A=Object.assign({},d.a);if(f.id===cur&&!typing())syncUI();status("Atualizado",true)}
      },()=>status("Sem ligação ao armazenamento"));
    });
  }catch(e){status("Guardado só neste dispositivo")}
})();
