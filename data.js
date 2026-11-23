// Perguntas das duas fichas (S_ELE = dele, S_ELA = dela)
const T=(k,l,ph)=>({k,l,y:"t",ph:ph||""});
const C=(k,l,o)=>({k,l,y:"c",o});
const M=(k,l,o)=>({k,l,y:"m",o});
const A_=(k,l,ph)=>({k,l,y:"a",ph:ph||""});
const FIT=["Justo","Normal","Largo / oversized"];
const TIPO=["Lisas","Com bonecos","Os dois / depende"];
const MAT=["Couro","Aço","Cordão","Outro"];
const CORW=["Preto","Azul","Cinzento","Dourado","Prateado","Castanho","Outra"];
const SN=["Sim","Não","Talvez"];
const S_ELE=[
{t:"Roupa",e:"👕",i:[
 {id:"camisolas",t:"Camisolas",f:[T("tam","Tamanho habitual"),T("marca","Marca de que mais gostas"),C("fit","Preferes",FIT),C("gola","Gola",["Até acima","Redonda","Em pico","Depende"]),C("tipo","Tipo",TIPO)]},
 {id:"sweats",t:"Sweats / Hoodies",f:[T("tam","Tamanho"),C("capuz","Com capuz?",["Sim","Não"]),C("fit","Corte preferido",["Justo","Normal","Oversized"]),C("gosto","Gostas mais de",["Lisas","Com estampados","Com logos"])]},
 {id:"tshirts",t:"T-shirts",f:[T("tam","Tamanho habitual"),C("fit","Corte preferido",["Justo","Normal","Largo"]),C("tipo","Tipo",TIPO)]},
 {id:"camisas",t:"Camisas",f:[T("tam","Tamanho"),C("fit","Preferes",["Slim","Regular","Largo"]),C("ocasioes","Usarias em ocasiões especiais?",SN)]},
 {id:"casacos",t:"Casacos / Blusões",f:[T("tam","Tamanho"),T("estilo","Estilo de que gostas"),M("cores","Cores aceitáveis",["Preto","Azul","Cinzento","Outras"]),T("outras","Outras cores")]},
 {id:"calcas",t:"Calças",f:[T("tam","Tamanho"),C("modelo","Modelo preferido",["Skinny","Slim","Straight","Largo"]),M("cores","Cores aceitáveis",["Preto","Azul","Cinzento","Ganga","Creme"])]},
 {id:"treino",t:"Calças de fato de treino",f:[T("tam","Tamanho"),C("fit","Corte",["Justo","Normal","Largo"])]},
 {id:"calcoes",t:"Calções",f:[T("tam","Tamanho"),M("cores","Cores aceitáveis",["Preto","Ganga","Cinzento","Creme","Outras"]),T("outras","Outras cores")]}
]},
{t:"Calçado",e:"👟",i:[
 {id:"tenis",t:"Ténis",f:[T("num","Número"),T("marcas","Marcas favoritas"),T("modelos","Modelos de que gostas"),M("cores","Cores aceitáveis",["Preto","Azul","Cinzento","Branco","Outras"]),T("outras","Outras cores")]},
 {id:"sapatos",t:"Sapatos",f:[T("num","Número"),C("usaria","Usarias se necessário?",SN)]},
 {id:"chinelos",t:"Chinelos",f:[T("num","Número"),T("estilo","Marca preferida / estilo")]}
]},
{t:"Roupa interior",e:"🧦",i:[
 {id:"boxers",t:"Boxers",f:[T("tam","Tamanho"),T("marca","Marca que usas")]},
 {id:"meias",t:"Meias",f:[T("tam","Tamanho"),C("cano","Preferência",["Cano curto","Cano médio","Cano alto"])]}
]},
{t:"Acessórios",e:"⌚",i:[
 {id:"relogio",t:"Relógio",f:[T("pulso","Tamanho do pulso (cm)"),C("estilo","Estilo",["Clássico","Desportivo","Minimalista","Smartwatch"]),C("forma","Formato",["Redondo","Retangular"]),C("mat","Pulseira / material",MAT),M("cor","Cor",CORW),T("outra","Outra cor"),T("esp","Alguma coisa em especial?")]},
 {id:"pulseiras",t:"Pulseiras",f:[C("usaria","Usarias?",["Sim","Não"]),T("pulso","Tamanho do pulso (cm)"),C("mat","Estilo preferido",MAT),M("cor","Cor",CORW),T("outra","Outra cor"),C("esp","Espessura",["Fina","Grossa"]),T("algo","Alguma coisa em especial?")]},
 {id:"aneis",t:"Anéis",f:[T("tam","Tamanho")]},
 {id:"colares",t:"Colares",f:[C("usaria","Usarias?",["Sim","Não"]),C("comp","Comprimento preferido",["Curto","Médio","Comprido"])]}
]},
{t:"Outros",e:"🎒",i:[
 {id:"mochilas",t:"Mochilas",f:[T("tam","Tamanho de que gostas"),T("estilo","Estilo"),T("cores","Cores aceitáveis")]},
 {id:"carteiras",t:"Carteiras",f:[C("tipo","Preferes",["Fina","Normal","Com porta-moedas"]),M("cores","Cores",["Preto","Azul","Castanha","Cinzenta","Outras"]),T("outras","Outras cores")]},
 {id:"cintos",t:"Cintos",f:[C("tam","Tamanho",["85 cm","90 cm","95 cm","100 cm"]),T("estilo","Estilo")]}
]},
{t:"Doces",e:"🍫",i:[
 {id:"chocolates",t:"Chocolates preferidos",f:[T("q","Quais?")]},
 {id:"gomas",t:"Gomas preferidas",f:[T("q","Quais?")]},
 {id:"pastilhas",t:"Pastilhas preferidas",f:[T("q","Quais?")]},
 {id:"snacks",t:"Snacks preferidos",f:[T("q","Quais?")]},
 {id:"doce",t:"Doce preferido",f:[T("q","Qual?")]}
]},
{t:"Coisas a acrescentar",e:"✨",i:[
 {id:"pijama",t:"Pijama",f:[T("tam","Tamanho"),C("baixo","Parte de baixo",["Calças","Calções"]),C("esp","Espessura",["Fino","Grosso"]),C("gola","Gola",["Redonda","Em V"]),M("padrao","Padrão",["Liso","Com bonecos","Linhas","Círculos","Quadrados","Outro"])]},
 {id:"cores",t:"Cores",f:[T("fav","Cor favorita"),T("nunca","Cores que nunca usarias")]},
 {id:"marcas",t:"Marcas e lojas favoritas",f:[A_("q","Quais?")]},
 {id:"desejos",t:"Coisas que gostas / gostavas de receber um dia",f:[A_("q","Lista à vontade","Ex.: jogos, roupa, …")]},
 {id:"outras",t:"Outras coisas importantes de saber",f:[A_("q","Escreve o que quiseres","Tudo o que ache que é útil saber")]}
]}
];
const S_ELA=[
{t:"Roupa",e:"👕",i:[
 {id:"camisolas",t:"Camisolas",f:[T("tam","Tamanho habitual"),T("marca","Marca de que mais gostas"),C("fit","Preferes",FIT),C("gola","Gola",["Até acima","Redonda","Em pico","Depende"]),C("tipo","Tipo",TIPO)]},
 {id:"sweats",t:"Sweats / Hoodies",f:[C("usaria","Usarias?",SN)]},
 {id:"tshirts",t:"T-shirts",f:[T("tam","Tamanho habitual"),C("fit","Corte preferido",["Justo","Normal","Largo"]),C("tipo","Tipo",TIPO)]},
 {id:"tops",t:"Tops",f:[T("tam","Tamanho habitual"),M("tipo","Tipo de top de que gosto mais",["Básico / simples","Desportivo","Cropped (curto)","Comprido","Alças finas","Alças largas","Outro"]),T("outro","Outro tipo (qual?)"),C("comp","Comprimento preferido",["Acima da cintura","Pela cintura","Mais comprido"]),C("decote","Decote preferido",["Redondo","Em V","Quadrado","Coração","Gola alta","Outro"]),C("alcas","Com alças",["Finas","Médias","Largas"]),C("costas","Costas",["Normais","Abertas","Nadador","Outro"]),C("ajuste","Ajuste",["Justo ao corpo","Normal","Largo / solto"])]},
 {id:"casacos",t:"Casacos / Blusões",f:[T("tam","Tamanho"),T("estilo","Estilo de que gostas"),T("cores","Cores aceitáveis")]},
 {id:"calcas",t:"Calças",f:[T("tam","Tamanho"),C("modelo","Modelo preferido",["Skinny","Slim","Straight","Largo","Push up"]),T("cores","Cores aceitáveis"),M("tipo","Tipo",["De pano","Ganga","Cabedal","Outras"]),C("cintura","Cintura",["Baixa","Média","Subida"])]},
 {id:"treino",t:"Calças de fato de treino",f:[C("usaria","Usarias?",SN)]},
 {id:"calcoes",t:"Calções",f:[T("tam","Tamanho"),M("cores","Cores aceitáveis",["Preto","Ganga","Cinzento","Creme","Outras"]),T("outras","Outras cores"),C("cintura","Cintura",["Curta","Longa"]),M("tecido","Tecido",["Cabedal","Pano","Ganga","Outros"])]},
 {id:"saias",t:"Saias",f:[C("comp","Comprimento",["Mini","Curta","Pelo joelho","Midi (abaixo do joelho)"]),C("cintura","Cintura",["Baixa","Normal","Alta"]),M("tecido","Tecido",["Cabedal","Pano","Ganga","Outros"]),M("cores","Cor aceitável",["Preto","Ganga","Cinzento","Creme","Outras"]),T("outras","Outras cores")]},
 {id:"vestidos",t:"Vestidos",f:[C("comp","Comprimento",["Mini","Curto","Midi","Comprido"]),C("modelo","Modelo",["Justo","Solto","Com roda","Cintado na cintura"]),M("tecido","Tecido",["Cabedal","Pano","Ganga","Outros"]),M("cores","Cor aceitável",["Preto","Ganga","Cinzento","Creme","Outras"]),T("outras","Outras cores")]}
]},
{t:"Calçado",e:"👟",i:[
 {id:"tenis",t:"Ténis",f:[T("num","Número"),T("marcas","Marcas favoritas"),T("modelos","Modelos de que gostas"),M("cores","Cores aceitáveis",["Preto","Azul","Cinzento","Branco","Outras"]),T("outras","Outras cores")]},
 {id:"sapatos",t:"Sapatos",f:[T("num","Número"),C("usaria","Usarias se necessário?",SN)]},
 {id:"botas",t:"Botas",f:[T("num","Número"),T("marcas","Marcas favoritas"),T("modelos","Modelos de que gostas"),C("formato","Formato",["Biqueira redonda","Biqueira fina"]),C("estilo","Estilo",["Casual","Elegante","Militar"]),M("cores","Cores aceitáveis",["Preto","Azul","Cinzento","Branco","Castanho","Outras"]),C("salto","Salto",["Baixo","Alto"]),C("altura","Altura",["Baixas","Médias","Altas"])]},
 {id:"chinelos",t:"Chinelos",f:[T("num","Número"),T("estilo","Marca preferida / estilo")]}
]},
{t:"Roupa interior",e:"🧦",i:[
 {id:"cuecas",t:"Cuecas",f:[T("tam","Tamanho"),T("marca","Marca que usas"),T("formato","Formato")]},
 {id:"meias",t:"Meias",f:[T("tam","Tamanho"),C("cano","Preferência",["Cano curto","Cano médio","Cano alto"])]},
 {id:"sutia",t:"Sutiã",f:[T("tam","Tamanho")]}
]},
{t:"Acessórios",e:"⌚",i:[
 {id:"relogio",t:"Relógio",f:[T("pulso","Tamanho do pulso (cm)"),C("estilo","Estilo",["Clássico","Desportivo","Minimalista","Smartwatch"]),C("mat","Pulseira / material",MAT),C("forma","Formato",["Redondo","Retangular"]),M("cor","Cor",CORW),T("outra","Outra cor")]},
 {id:"pulseiras",t:"Pulseiras",f:[C("usaria","Usarias?",["Sim","Não"]),T("pulso","Tamanho do pulso (cm)"),C("mat","Estilo preferido",MAT),M("cor","Cor",CORW),T("outra","Outra cor"),C("esp","Espessura",["Fina","Grossa"]),T("algo","Alguma coisa em especial?")]},
 {id:"aneis",t:"Anéis",f:[T("tam","Tamanho")]},
 {id:"colares",t:"Colares",f:[C("usaria","Usarias?",["Sim","Não"]),C("comp","Comprimento preferido",["Curto","Médio","Comprido"])]}
]},
{t:"Outros",e:"🎒",i:[
 {id:"mochilas",t:"Mochilas",f:[T("tam","Tamanho de que gostas"),T("estilo","Estilo"),T("cores","Cores aceitáveis"),T("esp","Com algo em especial")]},
 {id:"carteiras",t:"Carteiras",f:[C("tipo","Preferes",["Fina","Normal","Com porta-moedas"]),M("cores","Cores",["Preto","Azul","Castanha","Cinzenta","Outras"]),T("outras","Outras cores"),T("esp","Com algo em especial")]},
 {id:"cintos",t:"Cintos",f:[C("tam","Tamanho",["85 cm","90 cm","95 cm","100 cm"]),T("estilo","Estilo")]}
]},
{t:"Doces",e:"🍫",i:[
 {id:"chocolates",t:"Chocolates preferidos",f:[T("q","Quais?")]},
 {id:"gomas",t:"Gomas preferidas",f:[T("q","Quais?")]},
 {id:"pastilhas",t:"Pastilhas preferidas",f:[T("q","Quais?")]},
 {id:"snacks",t:"Snacks preferidos",f:[T("q","Quais?")]},
 {id:"doce",t:"Doce preferido",f:[T("q","Qual?")]}
]},
{t:"Mais",e:"✨",i:[
 {id:"pijama",t:"Pijama",f:[T("tam","Tamanho"),C("baixo","Parte de baixo",["Calças","Calções"]),C("esp","Espessura",["Fino","Grosso"]),C("gola","Gola",["Redonda","Em V"]),M("padrao","Padrão",["Liso","Com bonecos","Linhas","Círculos","Quadrados","Outro"])]},
 {id:"cores",t:"Cores",f:[T("fav","Cor favorita"),T("nunca","Cores que nunca usaria")]},
 {id:"marcas",t:"Marcas e lojas favoritas",f:[A_("q","Quais?")]},
 {id:"desejos",t:"Coisas que gosto / gostava de receber um dia",f:[A_("q","Lista à vontade","Ex.: jogos, roupa, …")]},
 {id:"outras",t:"Outras coisas importantes de saber",f:[A_("q","Escreve o que quiseres")]}
]}
];
