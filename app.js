//setup
const Discord = require("discord.js");
const client = new Discord.Client();

const Music = require('discord.js-musicbot-addon');
const config = require("./config.json");

var servercredits = Number(10);
var donatecredits = Number(0);
var maxcoinvalue = Number(9999);
const fs = require('fs');


function rt() {
	var randompost = bepis.getPost();
	return randompost;
} ;
	
//changing states & some triggers for bot
client.on("ready", () => {
	client.user.setActivity(`on ${client.guilds.size} servers`, {type : 'PLAYING' });
	console.log(`Bot se nastartoval s ${client.users.size} uživateli na ${client.guilds.size} serverech.`);
	var d = new Date(client.readyTimestamp);
	console.log(`Ready from: ${d}`);

});

client.on("guildCreate", guild => {
	client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
	client.user.setGame(`on ${client.guilds.size} servers`);
});

// dumping errors in console
client.on('error', e => {
	console.log("Catched Error:",e);});
  
client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find('general', 'member-log');
	if (!channel) return;
	channel.send(`Vítej na ${member.guild}, ${member.username}`);
});

client.on("message", async message => {
	//turns off listening to bot messages and DM's
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
  
	// turns off listening to stuff without prefix
	if(message.content.indexOf(config.prefix) !== 0) return;
  
	// slices the prefix, command and argument(s)
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

  
  
  //available commands
  
  if(command === "ping") {
	  //ping command, also serves as API load tester
		console.log(`${message.guild.name} zkusil ping a dostal hodnotu ${Math.round(client.ping)}.`);
		const m = await message.channel.send("Ping?");
		m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms. Real latency is ${Math.abs(Math.round(client.ping - (m.createdTimestamp - message.createdTimestamp)))}ms.`);
  }
  
  
  if(command === "roll"){
	const m = await message.channel.send(`Your roll is ${Math.floor((Math.random() * 100) + 1)}`);
  }
  
  
  if(command === "help" || command === "commands")
  {
	var helpfile = fs.readFileSync("./commands.txt", {"encoding": "utf-8"});
	const m = await message.channel.send(helpfile)
  }
  
  
  if(command === "hudba")
  {
	const m = await message.channel.send("`Music playback enabled.`")
	
	const music = new Music(client, {
	prefix: ";",
	maxQueueSize: "15",
	disableLoop: true,
	leaveCmd: 'begone',
	playCmd: 'play',
	skipCmd: 'skip',
	queueCmd: 'queue',
	pauseCmd: 'pause',
	resumeCmd: 'resume',
	ownerOverMember: false,
	youtubeKey: config.ytkey
	});
  }
  
  // joining rooms WIP
  if (command === "join")
  {
	  if (!message.guild) return;
	  else {
	  if (message.member.voiceChannel)
	  {
		  message.member.voiceChannel.join()
		  .then(connection => {
			  message.reply(`Připojeno do ${message.member.voiceChannel}.`)
			  console.log(`Pripojeno do ${message.member.voiceChannel}.`)
		  })
	  }
	  }
  }
  
  
  if(command === "invite")
	{
		if (args === "dogs")
		{
			const m = await message.channel.send("Feel free to invite your friends!: https://discord.gg/KcBBrYy");
		}
		else if (args === "code")
		{
			const m = await message.channel.send("Feel free to invite your friends!: https://discord.gg/txXM6hk");
		}
		else
		{
			const m = await message.channel.send("Feel free to invite your friends!: https://discord.gg/txXM6hk");
		}
	}
	
	
  if(command === "t")
  {
		console.log(`TTS debug arguments: got -> ${args}`);
		
		if(args == "ahoj")
		{
			const m = await message.channel.send("Ahoj.", {tts: true});
		}
		else if(args == "hello")
		{
			const m = await message.channel.send("Hello.", {tts: true});
		} 	
		else
		{
			const m = await message.channel.send("I don't understand.", {tts: true});
		}
  }
  
  
  if(command === "slots")
  {
		if (servercredits >= 2)
		{	
			var slota  = Math.ceil(Math.random() * 3);
			var slotb  = Math.ceil(Math.random() * 3);
			var slotc  = Math.ceil(Math.random() * 3);
			var slotcomm = new String('\ ');
			var slotae = new String(':apple:');
			var slotbe = new String(':apple:');
			var slotce = new String(':apple:');
			
			servercredits -= 2;
			const m = await message.channel.send("Slots 1.0.2b  \:slot_machine:\r\nRolling the slots!\r\n [ \:apple: ] [ \:banana: ] [ \:watermelon: ]  ");
			if(slota == 1) {slotae = ':apple:'}; if(slotb == 1) {slotbe = ':apple:'}; if(slotc == 1) {slotce = ':apple:'}; 
			if(slota == 2) {slotae = ':banana:'}; if(slotb == 2) {slotbe = ':banana:'}; if(slotc == 2) {slotce = ':banana:'}; 
			if(slota == 3) {slotae = ':watermelon:'}; if(slotb == 3) {slotbe =':watermelon:'}; if(slotc == 3) {slotce = ':watermelon:'}; 
			m.edit(`Slots 1.0.2b  \:slot_machine:\r\nRolled:\r\n [${slotcomm}${slotae} ] [${slotcomm}${slotbe} ] [${slotcomm}${slotce} ]`);
			if (slota == slotb && slotb == slotc)
			{
				servercredits += 10;
				message.reply('Congratulations!!!');
				console.log(`New slot game for ${message.author.username}: ${slota} ${slotb} ${slotc} || ${slotae} ${slotbe} ${slotce} || +10`);
			}
			else
			{
				console.log(`New slot game for ${message.author.username}: ${slota} ${slotb} ${slotc} || ${slotae} ${slotbe} ${slotce} || -2`);
			}
		}
		else
		{
			const m = await message.channel.send(`Not enough credits! Wait for next session!`);
		}
  }
  
  if(command === "coins")
	{
		const m = await message.channel.send(`Server coins for this session: ${servercredits}`);
	}

  if(command === "coinshelp")
	{
		const m = await message.channel.send("Coins are acquired by playing games. One game of slots costs 2 credits. Coin related commands: `coins, donate, donatepool, addc (admin only)`");
	}
	
	/* if(command === "get")
	{
		if(args != null){
				var get = args;
				var get2 = `${get}`;
				const m = await message.channel.send(`${get2}`);
		}
		else{
				const m = await message.channel.send("Nothing to get.");
		}
	}
	*/
	
  if(command === "addc")
	{
			if(args > 0 && args < maxcoinvalue)
			{
				servercredits += Number(args);
				console.log(`Added ${args} coins to the multiserver coin pool from ${message.author.username} on ${message.guild.name}.`)
				const m = await message.channel.send(`Added ${args} coins.`);
			}
			else
			{
				const m = await message.channel.send(`Ur retard, or what?`);
				console.log(`${message.author.username} on ${message.guild.name} tried to break teh system.`)
			}
	}
  
  if(command === "donate")
	{
		if(args > 0 && args < maxcoinvalue)
			{
				servercredits -= Number(args);
				donatecredits += Number(args);
				console.log(`Added ${args} coins to the donate pool from ${message.author.username} on ${message.guild.name}.`)
				const m = await message.channel.send(`Donated ${args} coins.`);
			}
			else
			{
				const m = await message.channel.send(`Ur retard, or what?`);
				console.log(`${message.author.username} on ${message.guild.name} tried to break teh system.`)
			}
	}
	
  if(command === "donatepool")
	{
		const m = await message.channel.send(`Donate coin pool status for this session: ${donatecredits}`);
	}
  
  if(command === "lvl")
	{
		const m = await message.channel.send(`WIP: Your level is: ${Math.floor(message.author.discriminator / 10)}`);
	}
  
  // random sentence generator
  
  
  if(command === "rs")
	{
const other = ['Přece  nám nebudou říkat jestli máme mít právo šaria , pivo a klobásku bych jim povině dal všem snízt. ',
  ' Asi normálni lednové počasí!Kdysi mrzlo až praštělo, ale nyní vše do noty migrantů,potažmo obtěžovatelů a vrahů......nový svět povstává!!! ',
  ' to by se za komunistů stát nemohlo, zlatý komunisti!!!!',
  ' republiku si  rozvracet nenecháme ',
  ' a média a česká televize mlčí',
  ' ja nejsem rasista..',
  ' Můžete laskavě vysvětlit proč pánskou módu prezentujete na "černochovi"??',
  ' Chci se zeptat jestli tento černý model je opravdu nutný ve vašem letáku. je?',
  ' a vyrešilo byse to kdy by byl Ortel na hradu ',
  ' známá  z německa říkala, že  vůbec nepracujou a  jenom pořád berou dávky ',
  ' a nejhorší jsou ti užitecní idioti co by nejrači pozvali všechny ty muslimské teroristy.kdybysme jeli mi k nim,tak nás odstřelí hned všechny v moři!!',
  ' Čina a Rusko jsou aspoň pro tuto zemy přínos ,což se o těch agentech CIA říct nedá !!!',
  ' 1000íce migrantů nám chce brát naše hodnoty,musíme chránit naše hranice!!!  ',
  ' Stejně tak jako USA  nebyly nikdy na měsícy ,tak media mlčí o te velké pravdě o imigrantech ',
  ' je to všechno naplánované kvůli new world order(NWO).',
  ' Otevřete už konecně oči, vy tupé ovce! !',
  ' postavil bych plot na hranicích a bylo by to vyřešené ',
  ' musime chránit naše hranice a hodnoty ',
  ' jinak já jsem hrdý na naše hodnoty, co si dokázal ty ty havlomrde jeden,kurvo ?  ',
  ' mymochodem Ortel zpíva jenom pravdu jako Kryl a toho slavíka si přístě snad odnese a toho cigána by měli zavřít někam do zoo .',
  ' Snad bude MÉNĚ PŘIVANDROVALCŮ JESTLI MI ROZUMÍTE??!!!',
  ' a ikdyž to není pravda tak by MOHLA BÝT!!!',
  ' 100tisíce imigrantů se sem valí a v ČT zase nic!!',
  ' jediný Okamura to tam říka tak jak to doopravdy je...',
  ' aspoň že ti naši hokejisti něco hrajou, kuci jedni naši,my jsi dyktovat z EU NEDÁME !!',
  '. Pan   prezident  je dobrý člověk,proto média lžou  ',
  ' už to psali i v parlamentních listech ',
  ' Kdyby dal každý Čech třeba jen 100 výček,mohly bysme postavit plot a chránit naše hranice,aha? ',
  ' Nechci zabrušovat, abych nemusel vybrušovat, ale ',
  ' Určitě možná s vámi tak úplně nesouhlasím ',
  ' lidi probuďte se už konečně kam až to necháme zajít?!',
  ' svrhněme tuto prohnilou vládu a nastolme vládu pracujícího lidu!!!!!',
  ' tohle už je snad horší než ten negr  v bile ',
  ' k lopatám je nahnat všechny ',
  ' kdyby ty cikorky pracovaly,tagby tohle nebylo!',
  ' ..šulini jedni,ať táhnou někam jinam ',
  ' zapalte ohně ',
  ' do ulic ',
  ' a co má jako znamenat ten černoch na letáku???',
  ' a běžte s multi-kulti do prdele!!',
  ' čechy čechům!!!!',
  ' říkal to i známý co dělá u Policie CR ',
  ' Něco se děje ,dneska u nas byl velky chemtrails, nahoda? ',
  ' Odstraňte ty multikulty pičoviny!',
  ' protože zatím ještě platí že mi tady jsme doma a ne ti paraziti...',
  ' je to řízena genocida bíle rasy ',
  ' vnucují nám islamisty, ale samy bysije domú nevzali ',
  ' Nevím proč by všichni ti havloidní studenti museli dostudovat,lopat je taky hodně ',
  ' nejsem rasista,evropa je bíla afrika je černá a asie je žlutá ',
  ' a vubec proc se v nasich ceskych letacich pro ceskou republiku neustale objevuji modelove NEGROIDNIHO typu??!',
  ' Tak s tímhle jděte víte kam..... stejně jako s chemtrails',
  ' přece nejsem xenofob ,když si to myslím ',
  ' raději podejte zprávu že vaše vláda s tím kolaborantem sobotkou přislíbila přijmout 29.000 ks čmoudů invazistů a kolik za to bude inkasovat od EU?',
  ' nejsem islamofob , ale ',
  ' jako ja nejsem rasista ,ale muslimaky bych postřílel hned na hranici!',
  ' protože jedinym řešením migrační krize je kulomet...',
  ' jenže Rusko aspoň nedělá ty valky kvůli te ropě ',
  ' a na naše důchodce musíme SBÍRAT VIČKA???? ',
  ' ale DVTV je prozápadní bulvární žumpa takže asitak..',
  ' všichni pravdoláskaři bysi mněli vspomenout na humanytárni bonbardovaní havlem!!',
  ' holt v téhle vlasti už začalo působit právo šaria kam to až zajde.....',
  ' z mojich daní nebudu platit tyhle "nepřízpůsobivé" ',
  ' nebuďte ovce....',
  ' to nejsou totiž uprchlíci ,mají totiž mobilní telefony a značkové obleční ',
  ' oni ale nechou aby ste vědeli pravdu...to se jim tak hodí ',
  ' Tvl Bango......to byl ČESKÝ Slavík....tak co se tam máš co srát Ty náplavo z indije.',
  ' Banga je cigoš a bojí se plynu jako všechny ty mrdky přivandrovaný.',
  ' To je tak když se většina přizpůsobuje menšině.A menšina si myslí že může všechno.',
  ' Islám v ČR nechceme!! ',
  ' A jako vítězové voleb vás, milí muslimové, nameleme do masokostní moučky.',
  ' Tahle fotka.......zvracení, jen zvracení vyvolává....',
  '..........mělo by se objasnit, jak to vlastně všechno bylo.....',
  ' Ludvík má pravdu. Co nám vlastně kapitalismus dává? Teroristy, teplouše, žebráky, bezdomovce, možná se dočkáme i války. To je ten váš kapitalismus. ',
  ' Tento havloidní exkrement je stejná nula jako Trotelfanof...škoda tyto zaprodané kreatury číst. ',
  ' Hehehe,natrtkalisi ,ať se starají.',
  ' V letech to nebyl žadnej koncentrák, tam jenom museli hodně pracovat, a protože na to ty cikani nebyly zvikly tak chcipali.',
  ' Doufám že to brzy vezme do ruky Tomio Okamura a vytře s Váma se všema! Raději Komunisty co plní vůli lidu, než takové EURO lokaje co lížou Merkel bábě ŘIŤ !!! :(',
  ' Však on  s nimi pan OKAMURA zatočí !!'];

const goodGuysSentences = [
  ' politice sice moc nerozumím ale ten ${ggRN} je dobrý, ten by tam aspoň udělal pořádek .',
  ' ${ggRN} chce aby jsme mohly bránit naší zemy.',
  ' ${ggRN} to mislí upřímně.',
  ' ${ggRN} říká aspoň tu pravdu.',
  ' a ${ggRN} a ${ggRN2} by mněli vyhrát volbi ',
  ' mislím,že ${ggRN} je jedinný rozumný , protože aspoň má koule a říka co si myslí. ',
  ' Každý kdo má mozek a není pyča přece musí vědět že ${ggRN} a ${ggRN2} to s náma mislí dobře .',
  ' ${ggRN} je tam aspoň srovná ty vlastizrádce  !!!  '
];

const badGuysSentencesSingular = [
  ' Ten ${bgsRN} už fakt neví jak by na sebe upozornil ,ten terorystický útok v Menčestru je určitě jeho práce, říkal mi to známý, co dělá na policii! V televizi zase nic!',
  ' Jak múže mít tahle žumpa pomluv a nadávak ${bgsRN} takový prostor k šíření svých bludů ? Kdo ho ještě podporuje ? Už aby byly volby !',
  ' On ten ${bgsRN} ma asi v hlave uplne nasr*ano neboco!',
  ' ${bgsRN} by asi potřeboval abyho ti negři imigrantský vzali pěkně zezadu abyje přestal hájit.....'
];

const badGuysSentencesPlural = [
  ' za všechno můžou ${bgpRN} a ${bgpRN2} .',
  ' Exystuje tajný plán , který vytvořili ${bgpRN} a ${bgpRN2} a teď se to všechno děje otevřete už konečně oči ',
  ' ${bgpRN} a ${bgpRN2} stejně pořád jenom okrádají stát a slušné pracující lidi.',
  ' ${bgpRN} do plynu!!!!',
  ' ,proto ze tohle jsou veci bez kterych by tato republika fungovala: ${bgpRN} a ${bgpRN2} ',
  ' je to jednoduché.. ${bgpRN}? Měl bych řešení - vyhostit do afriky!!!!',
  ' Je to přece uplně jasné že korporace a ${bgpRN2} chcou aby jste si to tak misleli .',
  ' Naše celá vláda i celá EU jsou jenom loutky , otevřete už ty oči ,vždyť i ${bgpRN} ,${bgpRN2} nebo ${bgpRN3}, všichni nám jen lžou ',
  ' Vždyť když jsou tak mladí a mají na mobilní  telefon tak přece můžou i jít bojovat za svoji zemi to jenom ${bgpRN} a ${bgpRN2} říkaji ,že jich je tady jenom málo,ale to se zmnění.',
  ' ${bgpRN} a ${bgpRN2} nemusí pracovat a můžou dostávat dávky a my na naše děti musíme jenom zbírat výčka, aby byly zdravé,pro tohle jsem klíčema necinkal  zlatí komunisti!!! ! ',
  ' ${bgpRN}, ${bgpRN2} ,${bgpRN3} ale i ${bgpRN4} by mněly jít všichni raději někam do afriky, nebo rovnou do koncentraku a byl by už konečně klid .',
  ' Přece nechceme aby slušní lidi musely platit  jenom daně a hubu jak ovce a ${bgpRN}, ${bgpRN2}, ${bgpRN3} aspol. pořád jenom kradli tohle už ne!!!  ',
  ' Jinak včera jsem se díval na oblohu a bila tam velká dávka chemtrails větši nez obvikle můžou za to ${bgpRN2} a Kalousek!!!!!!'
];

const goodGuys = ['pan Babiš', 'Babiš', 'pan mluvčí Ovčáček', 'Ovčáček', 'Zeman', 'pan prezident', 'Tomio', 'Okamura', 'pan Konvička',
   'pan president Putin', 'Putin', 'Ortel', 'prezident Trump', 'Ivan Bartoš', 'SPD', 'KSČM', 'Míla Rozner', 'Rozner'];

const badGuysSingle = ['Sobotka', 'vlastizrádce Sobotka', 'Kalous', 'Diensbier', 'Horáček', 'Obama', 'svině Kalousek',
   'Moravec', 'Drahoš', 'Ferri', 'tunelář Bakala'];

const badGuysOther = [ 'sluničkári', 'prohavlovská pakaž', 'kolaboranti', 'muslimáci',
 'fašisti na ukrajine', 'havloidi', 'birokrati z EU', 'eurofanatici',
 'nadnárodni elity', 'pražská kavárna', 'novinářská žumpa', 'eurohujeři',
 'iluminati', 'USA ambasáda', 'CIA', 'korporace', 'diktát z EU', 'islám', 'cigani', 'cikáni', 'romove', 'Moravec',
 'vítači', 'zelený mozky', 'dyktat', 'česká televize'];

const otherThingsWorthHating = ['integrací', 'eurofederalizací', 'diskriminací', 'emancipací', 'eurofašizací', 'inkluzí', 'globalizací'];
const otherThingsWorthHatingSentences = [
  ' ať jdou s tou {0} už do PRDELE!',
  ' s {0} ať si jdou demonstrovat do Bruselu......',
  ' jako nic proti lidským právům, ale s tou {0} to je slepá ulička..',
  ' {0} posedlí sluníčkáři,nic víc....',
  ' Neziskovky tu zaplavují médija s {0} a mezitím deseti1000íce přivandrovalců se sem mlčky hrne!!'
];

const randomBullshit = [
  ' JÁ TU STÁLE PSAL , PROPUSTIT A ŘÁDNĚ ODŠKODNIT, NIC NEUDĚLAL A MNOHO ODBORNÍKŮ TADY SE DO MĚ POUŠTĚLO , NEUDĚL A PRÁVEM JE NA SVOBODĚ , KDO ZNÁ NAŠE SOUDY , TAK TO POCHOPÍ !!!!!!!!',
  ' Zle je mi především z Kalouska,opilce a žvanila, kterého nenávidí 99% české populace a který denodenně otravuje a znechucuje posluchače hlabvní zpravodaj. relace ČT!',
  ' Má pěkný tričko, zelená je barva jara, síly a naděje ! Tak snad už bude ten nahoře stát při něm.Věřím mu, že to neudělal a Zemanovi díky za odvahu, že mu dal milost "proti všem".',
  ' Co si to ten zaprodaný ploskolebec dovoluje? On je ten, který měl být dávno pryč z politiky! Ví, že po volbách půjde, tak ještě chce honem nahrabat za 60000 migrantů! To mu přece nemůže projít!',
  ' Bango zbal sebe a celou rodinu a romskou komunytu a jdete do kanady stát aspon ušetří nekolik miliard korun když je to tady stát plnej nácku.Pochop to už že lidi jsou nasraní že musí vydělávat na sociálky nepracujících které jsou mnohdy vyšší než jejich platy .JO A UPRCHLIKY SI VEM TAKY CHUDINKO.',
  ' Seš jet tupej cikán Bango....A nic víc!!!Sere tě ze se český národ spojil proti dementum jako jsi ty a podobní...běž zase krást kola a vykrádat sklepy cikáne... :-) :-) :-)',
  ' V pripade Davida Cerneho ve skutecnosti se o zadneho umelce nejedna. Je to obycejna moralni zruda, parazit a vyzirka penez danovych poplatniku. Typicky slunickarsky zlocinec...',
  ' Pane Kájínek pravda se ukázala trvale opálený bez mozku nemá co svědčit ale veledůložitá věc je že jste uvolnil zásluhou pana prezidenta místo v base panu premierovy sobotkovi. Díky.',
  ' "PUSSYNA" MERKELOVA si může na pažbu vyrýt dalších jak 20 zářezů za mrtvé náctileté děti :-((( Proboha,kdyuž jí veřejně někdo odsoudí a přinejmenším doživotně zavře za VLASTIZRADU nejen NEMECKA ale především celé EVROPY !!!!'
];


function getProbability(){
  var num = Math.random();
  if(num < 0.3) return 1;  //probability A 0.3
  else if(num < 0.6) return 2; // probability B 0.3
  else if(num < 0.9) return 4; //probability C 0.3
  else return 3;  //probability D  0.1
}

function generujGG() {
	var rn1 = Math.floor(Math.random() * goodGuys.length);
	var rn2 = Math.floor(Math.random() * goodGuys.length);
    var rn3 = Math.floor(Math.random() * goodGuysSentences.length);
	var rnGGraw = goodGuysSentences[rn3];   
    var ggRN = goodGuys[rn1];
    var ggRN2 = goodGuys[rn2];
    var rnGGres = rnGGraw.replace("${ggRN}", ggRN);
    var rnGGres2 = rnGGres.replace("${ggRN2}", ggRN2);
    return rnGGres2;
}

function generujBGS() {
		
	var rn1 = Math.floor(Math.random() * badGuysSingle.length);
	var rn2 = Math.floor(Math.random() * badGuysSingle.length);
    var rn3 = Math.floor(Math.random() * badGuysSentencesSingular.length);
	var BGSraw = badGuysSentencesSingular[rn3];   
    var bgsRN = badGuysSingle[rn1];
    var BGSres = BGSraw.replace("${bgsRN}", bgsRN);
    return BGSres;
}

function generujBGP() {
	var rn1 = Math.floor(Math.random() * badGuysOther.length);
	var rn2 = Math.floor(Math.random() * badGuysOther.length);
    var rn3 = Math.floor(Math.random() * badGuysSentencesPlural.length);
	var rn4 = Math.floor(Math.random() * badGuysOther.length);
	var rn5 = Math.floor(Math.random() * badGuysOther.length);
	var BGPraw = badGuysSentencesPlural[rn3];   
    var bgpRN = badGuysOther[rn1];
    var bgpRN2 = badGuysOther[rn2];
	var bgpRN3 = badGuysOther[rn4];
	var bgpRN4 = badGuysOther[rn5];
    var bgpres = BGPraw.replace("${bgpRN}", bgpRN);
    var bgpres2 = bgpres.replace("${bgpRN2}", bgpRN2);
	var bgpres3 = bgpres2.replace("${bgpRN3}", bgpRN3);
	var bgpres4 = bgpres3.replace("${bgpRN4}", bgpRN4);
    return bgpres4;
}

function generujOT() {
	var rnOT = Math.floor(Math.random() * other.length);
	return other[rnOT];
}

function getPostFive() {
	document.getElementById("post").innerHTML = getPost();
}

function getPost(){
	
	if (getProbability() == 1){
		//single sentences from randomu
		if (getProbability() == 1){
			return generujGG();
		}
		else if (getProbability() == 2){
			return generujBGS();
		}
		else if (getProbability() == 3){
			return generujBGP();
		}		
		else {
			return generujOT();
		}
	}
	else if (getProbability() == 2){
		// double sentences from random
		var vetaranddouble = "";
			if (getProbability() == 1){
				vetaranddouble += generujGG();
			}
			else if (getProbability() == 2){
				vetaranddouble += generujBGS();
			}
			else if (getProbability() == 3){
				vetaranddouble += generujBGP();
			}		
			else {
				vetaranddouble += generujOT();
			};
			
			if (getProbability() == 1){
				vetaranddouble += generujGG();
			}
			else if (getProbability() == 2){
				vetaranddouble += generujBGS();
			}
			else if (getProbability() == 3){
				vetaranddouble += generujBGP();
			}		
			else {
				vetaranddouble += generujOT();
			};
			
			return vetaranddouble;
			
	}
	else if (getProbability() == 3){
		// all types on random, random number of sentences
		var rand01 = Math.ceil(Math.random * 5);
		var vetarand = "";
		
		for (var i = 0; i <= rand01; i++)
		{
			if (Math.random > 0.5)
			{
				if (Math.random > 0.5)
				{
					vetarand += generujGG();
				}
				else
				{
					vetarand += generujBGP();
				}
			}
			else
			{
				if (Math.random > 0.5)
				{
					vetarand += generujBGS();
				}
				else
				{
					vetarand += generujOT();
				}
			}
		}
		return vetarand;
		
	}		
	else {
		// inputted value = number of sentences
		if (getProbability() == 1){
			return generujGG() + ", " + generujBGP();
		}
		else if (getProbability() == 2){
			return generujGG() + ", " + generujBGP() + ", " + generujOT();
		}
		else if (getProbability() == 3){
			return generujBGP() + " " + generujBGS() + " " + generujOT();
		}		
		else {
			return generujOT() + " " + generujBGS() + " " + generujBGP();
		}
	}
	
	return bepis;
	}
	const m = await message.channel.send(getPost());
}
		
  });


// refreshing state WIP
client.login(config.token);

// trycatching dead promises
process.on('unhandledRejection', err => console.error(`Uncaught Promise Rejection: \n${err.stack}`));