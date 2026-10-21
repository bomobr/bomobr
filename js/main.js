var WA="5534984139065";
function clean(s,n){return String(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,"").trim().slice(0,n)}
function mq(id,w){var h="";for(var k=0;k<2;k++)w.forEach(function(t,i){h+="<span>"+t+"</span><i>✦</i>"});document.getElementById(id).innerHTML=h+h}
mq("m1",["Javascript","Criatividade","Landing pages","Design","Arte","HTML","CSS"]);
document.getElementById("dbtn").onclick=function(){
  var n=document.getElementById("dn").value.trim(),o=document.getElementById("do").value.trim(),r=document.getElementById("res");
  if(!n||!o){r.innerHTML='<div class="ic"></div><p>Conte sobre o negócio e o objetivo para ver a recomendação.</p>';return}
  var t=(n+" "+o).toLowerCase(),f,d;
  if(/restaurante|bar |bar$|lanchonete|pizzaria|cardápio|cardapio|mesa|garçom/.test(t)){f="Sistema para restaurantes e bares";d="Site completo com cardápio digital, chamada de garçom e pedido de conta, com placas NFC/QR Code nas mesas."}
  else if(/institucional|empresa|portf|escrit|advoca|contab|arquitet|fot[oó]graf|serviços|equipe|sobre/.test(t)){f="Site institucional";d="Várias páginas (início, sobre, serviços, contato) para passar credibilidade e ser encontrado no Google."}
  else{f="Landing page";d="Uma página única, focada em uma ação: vender, captar contatos ou chamar no WhatsApp."}
  var s=document.createElement("div");s.innerHTML='<div class="ic"></div><h3></h3><p></p><a class="btn k" style="margin-top:22px" href="#contato">Quero isso</a>';
  s.querySelector("h3").textContent=f;s.querySelector("p").textContent=d+" Ideal para: "+n+".";
  r.innerHTML=s.innerHTML};
var DIRECT=false; // mude para true só depois de configurar o envio direto pela API (veja o README)
function waUrl(m){return "https://wa.me/"+WA+"?text="+encodeURIComponent(m)}
function openWa(m){var w=window.open(waUrl(m),"_blank");if(w){try{w.opener=null}catch(x){}}else{location.href=waUrl(m)}}
document.getElementById("fm").onsubmit=function(e){
  e.preventDefault();
  var v=function(i){return clean(document.getElementById(i).value,i==="fp"?500:120)},er=document.getElementById("err");
  if(!v("fn")||!v("fo")||!v("fi")||!v("fp")){er.style.color="#ff8a7a";er.textContent="Preencha todos os campos obrigatórios (*).";return}
  if(!document.getElementById("fc").checked){er.style.color="#ff8a7a";er.textContent="Marque a caixa de concordância para enviar.";return}
  var m="Olá, vim pelo site da bomo!\n\n*Nome:* "+v("fn")+"\n*Empresa:* "+v("fo")+"\n*Investimento:* até "+v("fi")+"\n*Projeto:* "+v("fp");
  function link(txt){var a=document.createElement("a");a.href=waUrl(m);a.target="_blank";a.rel="noopener noreferrer";a.textContent="toque aqui";a.style.cssText="color:#fdc921;font-weight:700";er.appendChild(document.createTextNode(txt));er.appendChild(a);er.appendChild(document.createTextNode("."))}
  er.textContent="";
  if(!DIRECT){openWa(m);er.style.color="#27c98a";link("Abrindo o WhatsApp… se não abrir, ");return}
  var btn=document.querySelector("#fm .sd");
  btn.disabled=true;er.style.color="#fff";er.textContent="Enviando…";
  fetch("/.netlify/functions/contato",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({nome:v("fn"),empresa:v("fo"),invest:v("fi"),projeto:v("fp"),site:clean(document.getElementById("fh").value,50)})})
    .then(function(r){if(!r.ok)throw 0;er.style.color="#27c98a";er.textContent="Recebemos! Entraremos em contato em breve.";document.getElementById("fm").reset()})
    .catch(function(){er.style.color="#ff8a7a";er.textContent="";link("Não foi possível enviar agora. Para falar com a gente pelo WhatsApp, ")})
    .then(function(){btn.disabled=false});
};
Array.prototype.forEach.call(document.querySelectorAll("input,textarea"),function(el){if(el.type!=="checkbox")el.maxLength=el.tagName==="TEXTAREA"?500:120});
