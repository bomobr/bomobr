bomo - site leve e seguro (com envio direto ao WhatsApp)

ARQUIVOS: index.html (início), catalogo.html (catálogo, link separado: seudominio.com/catalogo), js/catalogo.js, img/logo.webp, img/favicon.svg (muda de cor no modo claro/escuro), img/favicon.png (reserva), css/style.css, js/main.js, _headers, netlify/functions/contato.js

PUBLICAR: Netlify (arraste a pasta inteira ou conecte ao GitHub). HTTPS automático.

ENVIO DIRETO AO WHATSAPP (sem o cliente apertar enviar)
1. Em developers.facebook.com crie um app tipo "Business" e adicione o produto WhatsApp.
2. Cadastre um número para a API (não pode estar ativo no app WhatsApp comum) e copie o "Phone number ID".
3. Gere um token permanente (Usuário do sistema) com a permissão whatsapp_business_messaging.
4. No Gerenciador do WhatsApp crie um modelo (template) de categoria Utilidade, idioma Português (BR), nome: novo_contato, com este corpo:
   Novo contato pelo site bomo. Nome: {{1}} | Empresa: {{2}} | Investimento até: {{3}} | Projeto: {{4}}
   e aguarde a aprovação da Meta.
5. No Netlify > Site settings > Environment variables, crie:
   WA_TOKEN = token do passo 3
   WA_PHONE_ID = Phone number ID do passo 2
   WA_TO = 5534984139065   (seu número, que recebe os contatos)
   WA_TEMPLATE = novo_contato
   ALLOWED_ORIGIN = https://SEU-DOMINIO (ex.: https://bomo.com.br)
6. No arquivo js/main.js troque var DIRECT=false por var DIRECT=true e faça um novo deploy. Pronto.

Com DIRECT=false (padrão), o site abre o WhatsApp com a mensagem pronta (o cliente toca em enviar). Funciona em qualquer hospedagem, celular e computador.

PRIVACIDADE: nada é guardado no site. O token fica só nas variáveis do Netlify, nunca no código.
