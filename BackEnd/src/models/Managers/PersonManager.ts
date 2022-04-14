import {Person} from "../People/Person";
import {User} from "../People/User"
import {UserJSON} from "../Types";
import {Order} from "../Transaction/Order";


export class PersonManager {

  private people: Map<number, Person>;

  private static instance: PersonManager | null = null;

  private constructor() {
    this.people = new Map<number, Person>();

    let profile1: String[] = ['Dmytro', 'Malevskyi', 'dimalev', 'profile1', 'dimalev@gmail.com'];
    let prof1 = new User(1, profile1, '07745674336', 'UAH');
    this.people.set(this.people.size, prof1);
    let profile2: String[] = ['Uwais', 'Ishaq', 'uwii', 'profile2', 'uwii@gmail.com'];
    let prof2 = new User(2, profile2, '07765454687', 'GBP');
    this.people.set(this.people.size, prof2);
    let profile3: String[] = ['Ryan', 'Gibson', 'Ryan_', 'profile3', 'g_ryan@gmail.com'];
    let prof3 = new User(3, profile3, '07735827469', 'GBP');
    this.people.set(this.people.size, prof3);
    let profile4: String[] = ['Imangali', 'Akhat', 'ima', 'profile4', 'ima@gmail.com'];
    let prof4 = new User(4, profile4, '07720575935', 'EUR');
    this.people.set(this.people.size, prof4);
    let patrykDetails: String[] = ['Patryk', 'Kuchta', 'kuchtavr6', 'QmIsBad', 'kuchtavr6@gmail.com'];
    let patryk = new User(5, patrykDetails, '0770000000', 'PLN')
    this.people.set(this.people.size, patryk);

    let profile7: String[] = ['Faris','Javaid','faris11','profile7','faris11@gmail.com'];
    let prof7 = new User(7, profile7, '07720549856', 'EUR');
    this.people.set(this.people.size, prof7);

    let profile6: String[] = ['Mustafa','Bozkurt','MustafaBozkurk','easy','m.bozkurt@qmul.ac.uk'];
    let mustafa = new User(6, profile6, '07720575385', 'TRY');
    this.people.set(this.people.size, mustafa);

    let profile1000: String[] = ['Guest1','Anonymous','guest1','crypto','guest1@qmul.ac.uk'];
    let prof1000 = new User(101, profile1000, '07720549856', 'EUR');
    this.people.set(this.people.size, prof1000);

    let profile1001: String[] = ['Guest2','Anonymous','guest2','gram','guest2@qmul.ac.uk'];
    let prof1001 = new User(102, profile1001, '07720549856', 'GBP');
    this.people.set(this.people.size, prof1001);
    
    let profile8: String[] = ['Tori','LaRue','ToriLaRue','profile8','Tori.LaRue@gmail.com'];
    this.people.set(this.people.size, new User(8, profile8, '07739586744', 'USD'));
    let profile9: String[] = ['Netty','Chrystel','NettyChrystel','profile9','Netty.Chrystel@gmail.com'];
    this.people.set(this.people.size, new User(9, profile9, '07720575935', 'GBP'));
    let profile10: String[] = ['Caryl','Hachmin','CarylHachmin','profile10','Caryl.Hachmin@gmail.com'];
    this.people.set(this.people.size, new User(10, profile10, '07768473864', 'GBP'));
    let profile11: String[] = ['Danika','Bettine','DanikaBettine','profile11','Danika.Bettine@gmail.com'];
    this.people.set(this.people.size, new User(11, profile11, '07737846542', 'GBP'));
    let profile12: String[] = ['Sadie','Mendez','SadieMendez','profile12','Sadie.Mendez@gmail.com'];
    this.people.set(this.people.size, new User(12, profile12, '07737846543', 'USD'));
    let profile13: String[] = ['Feliza','Toni','FelizaToni','profile13','Feliza.Toni@gmail.com'];
    this.people.set(this.people.size, new User(13, profile13, '07737345643', 'GBP'));
    let profile14: String[] = ['Lexine','Amasa','LexineAmasa','profile14','Lexine.Amasa@gmail.com'];
    this.people.set(this.people.size, new User(14, profile14, '07734758454', 'EUR'));
    let profile15: String[] = ['Cyb','Cornelia','CybCornelia','profile15','Cyb.Cornelia@gmail.com'];
    this.people.set(this.people.size, new User(15, profile15, '07235345543', 'GBP'));
    let profile16: String[] = ['Robinia','Yerkovich','RobiniaYerkovich','profile16','Robinia.Yerkovich@gmail.com'];
    this.people.set(this.people.size, new User(16, profile16, '07737345432', 'GBP'));
    let profile17: String[] = ['Briney','Teryn','BrineyTeryn','profile17','Briney.Teryn@gmail.com'];
    this.people.set(this.people.size, new User(17, profile17, '07737846455', 'GBP'));
    let profile18: String[] = ['Cyb','Bates','CybBates','profile18','Cyb.Bates@gmail.com'];
    this.people.set(this.people.size, new User(18, profile18, '07737435456', 'GBP'));
    let profile19: String[] = ['Estell','Amand','EstellAmand','profile19','Estell.Amand@gmail.com'];
    this.people.set(this.people.size, new User(19, profile19, '07737345432', 'GBP'));
    let profile20: String[] = ['Fina','Pascia','FinaPascia','profile20','Fina.Pascia@gmail.com'];
    this.people.set(this.people.size, new User(20, profile20, '07234534322', 'GBP'));
    let profile21: String[] = ['Atlanta','Arne','AtlantaArne','profile21','Atlanta.Arne@gmail.com'];
    this.people.set(this.people.size, new User(21, profile21, '07737834543', 'EUR'));
    let profile22: String[] = ['Alexine','Lipson','AlexineLipson','profile22','Alexine.Lipson@gmail.com'];
    this.people.set(this.people.size, new User(22, profile22, '07339478344', 'USD'));
    let profile23: String[] = ['Kelly','Israeli','KellyIsraeli','profile23','Kelly.Israeli@gmail.com'];
    this.people.set(this.people.size, new User(23, profile23, '07339478345', 'GBP'));
    let profile24: String[] = ['Tonia','Girardo','ToniaGirardo','profile24','Tonia.Girardo@gmail.com'];
    this.people.set(this.people.size, new User(24, profile24, '07339423455', 'USD'));
    let profile25: String[] = ['Doro','Alwin','DoroAlwin','profile25','Doro.Alwin@gmail.com'];
    this.people.set(this.people.size, new User(25, profile25, '07235343345', 'GBP'));
    let profile26: String[] = ['Tarra','Avi','TarraAvi','profile26','Tarra.Avi@gmail.com'];
    this.people.set(this.people.size, new User(26, profile26, '07335435344', 'USD'));
    let profile27: String[] = ['Miquela','Helfand','MiquelaHelfand','profile27','Miquela.Helfand@gmail.com'];
    this.people.set(this.people.size, new User(27, profile27, '07235334344', 'EUR'));
    let profile28: String[] = ['Suzette','Yate','SuzetteYate','profile28','Suzette.Yate@gmail.com'];
    this.people.set(this.people.size, new User(28, profile28, '07339478342', 'EUR'));
    let profile29: String[] = ['Emelina','Bartlett','EmelinaBartlett','profile29','Emelina.Bartlett@gmail.com'];
    this.people.set(this.people.size, new User(29, profile29, '07339345543', 'USD'));
    let profile30: String[] = ['Julieta','Anastatius','JulietaAnastatius','profile30','Julieta.Anastatius@gmail.com'];
    this.people.set(this.people.size, new User(30, profile30, '07339457475', 'USD'));
    let profile31: String[] = ['Maridel','Concha','MaridelConcha','profile31','Maridel.Concha@gmail.com'];
    this.people.set(this.people.size, new User(31, profile31, '07339434753', 'EUR'));
    let profile32: String[] = ['Gilligan','Robertson','GilliganRobertson','profile32','Gilligan.Robertson@gmail.com'];
    this.people.set(this.people.size, new User(32, profile32, '07976748606', 'USD'));
    let profile33: String[] = ['Phedra','Salvidor','PhedraSalvidor','profile33','Phedra.Salvidor@gmail.com'];
    this.people.set(this.people.size, new User(32, profile33, '07543703529', 'USD'));
    let profile34: String[] = ['Chrystel','Ovid','ChrystelOvid','profile34','Chrystel.Ovid@gmail.com'];
    this.people.set(this.people.size, new User(34, profile34, '07128219215', 'USD'));
    let profile35: String[] = ['Bill','Frendel','BillFrendel','profile35','Bill.Frendel@gmail.com'];
    this.people.set(this.people.size, new User(35, profile35, '07605291577', 'USD'));
    let profile36: String[] = ['Gui','Martguerita','GuiMartguerita','profile36','Gui.Martguerita@gmail.com'];
    this.people.set(this.people.size, new User(36, profile36, '07285871977', 'USD'));
    let profile37: String[] = ['Arabel','Janene','ArabelJanene','profile37','Arabel.Janene@gmail.com'];
    this.people.set(this.people.size, new User(37, profile37, '07820601719', 'USD'));
    let profile38: String[] = ['Jere','Elisha','JereElisha','profile38','Jere.Elisha@gmail.com'];
    this.people.set(this.people.size, new User(38, profile38, '07262610143', 'USD'));
    let profile39: String[] = ['Theodora','Karylin','TheodoraKarylin','profile39','Theodora.Karylin@gmail.com'];
    this.people.set(this.people.size, new User(39, profile39, '07779259384', 'USD'));
    let profile40: String[] = ['Brynna','Vorster','BrynnaVorster','profile40','Brynna.Vorster@gmail.com'];
    this.people.set(this.people.size, new User(40, profile40, '07137844104', 'USD'));
    let profile41: String[] = ['Grier','Marijo','GrierMarijo','profile41','Grier.Marijo@gmail.com'];
    this.people.set(this.people.size, new User(41, profile41, '07913616054', 'USD'));
    let profile42: String[] = ['Iseabal','Nunci','IseabalNunci','profile42','Iseabal.Nunci@gmail.com'];
    this.people.set(this.people.size, new User(42, profile42, '07688687198', 'USD'));
    let profile43: String[] = ['Deane','Marlie','DeaneMarlie','profile43','Deane.Marlie@gmail.com'];
    this.people.set(this.people.size, new User(43, profile43, '07050263456', 'USD'));
    let profile44: String[] = ['Gratia','Alfons','GratiaAlfons','profile44','Gratia.Alfons@gmail.com'];
    this.people.set(this.people.size, new User(44, profile44, '07485114646', 'USD'));
    let profile45: String[] = ['Britte','Sperling','BritteSperling','profile45','Britte.Sperling@gmail.com'];
    this.people.set(this.people.size, new User(45, profile45, '07474200525', 'USD'));
    let profile46: String[] = ['Roz','Stefa','RozStefa','profile46','Roz.Stefa@gmail.com'];
    this.people.set(this.people.size, new User(46, profile46, '07824425200', 'USD'));
    let profile47: String[] = ['Shauna','Reinke','ShaunaReinke','profile47','Shauna.Reinke@gmail.com'];
    this.people.set(this.people.size, new User(47, profile47, '07982975485', 'USD'));
    let profile48: String[] = ['Jeanna','Elo','JeannaElo','profile48','Jeanna.Elo@gmail.com'];
    this.people.set(this.people.size, new User(48, profile48, '07827175145', 'USD'));
    let profile49: String[] = ['Perry','Simmonds','PerrySimmonds','profile49','Perry.Simmonds@gmail.com'];
    this.people.set(this.people.size, new User(49, profile49, '07476259519', 'USD'));
    let profile50: String[] = ['Merci','Bigner','MerciBigner','profile50','Merci.Bigner@gmail.com'];
    this.people.set(this.people.size, new User(50, profile50, '07006366946', 'USD'));
    let profile51: String[] = ['Ellette','Richers','ElletteRichers','profile51','Ellette.Richers@gmail.com'];
    this.people.set(this.people.size, new User(51, profile51, '07075748497', 'USD'));
    let profile52: String[] = ['Celestyna','Jotham','CelestynaJotham','profile52','Celestyna.Jotham@gmail.com'];
    this.people.set(this.people.size, new User(52, profile52, '07665846643', 'USD'));
    let profile53: String[] = ['Mathilda','Sikorski','MathildaSikorski','profile53','Mathilda.Sikorski@gmail.com'];
    this.people.set(this.people.size, new User(53, profile53, '07971740092', 'USD'));
    let profile54: String[] = ['Winifred','Telfer','WinifredTelfer','profile54','Winifred.Telfer@gmail.com'];
    this.people.set(this.people.size, new User(54, profile54, '07116588389', 'USD'));
    let profile55: String[] = ['Jacquetta','Woodberry','JacquettaWoodberry','profile55','Jacquetta.Woodberry@gmail.com'];
    this.people.set(this.people.size, new User(55, profile55, '07698116916', 'USD'));
    let profile56: String[] = ['Mahalia','Parsaye','MahaliaParsaye','profile56','Mahalia.Parsaye@gmail.com'];
    this.people.set(this.people.size, new User(56, profile56, '07356424844', 'USD'));
    let profile57: String[] = ['Merle','Natica','MerleNatica','profile57','Merle.Natica@gmail.com'];
    this.people.set(this.people.size, new User(57, profile57, '07619249137', 'USD'));
    let profile58: String[] = ['Lanae','Yusuk','LanaeYusuk','profile58','Lanae.Yusuk@gmail.com'];
    this.people.set(this.people.size, new User(58, profile58, '07258284161', 'USD'));
    let profile59: String[] = ['Anthia','Fry','AnthiaFry','profile59','Anthia.Fry@gmail.com'];
    this.people.set(this.people.size, new User(59, profile59, '07220394147', 'USD'));
    let profile60: String[] = ['Emma','Pulsifer','EmmaPulsifer','profile60','Emma.Pulsifer@gmail.com'];
    this.people.set(this.people.size, new User(60, profile60, '07284211555', 'USD'));
    let profile61: String[] = ['Talya','Kesley','TalyaKesley','profile61','Talya.Kesley@gmail.com'];
    this.people.set(this.people.size, new User(61, profile61, '07935843952', 'USD'));
    let profile62: String[] = ['Fina','Himelman','FinaHimelman','profile62','Fina.Himelman@gmail.com'];
    this.people.set(this.people.size, new User(62, profile62, '07013586359', 'USD'));
    let profile63: String[] = ['Mildrid','Louanna','MildridLouanna','profile63','Mildrid.Louanna@gmail.com'];
    this.people.set(this.people.size, new User(63, profile63, '07705739483', 'USD'));
    let profile64: String[] = ['Allyce','Auberbach','AllyceAuberbach','profile64','Allyce.Auberbach@gmail.com'];
    this.people.set(this.people.size, new User(64, profile64, '07516455186', 'USD'));
    let profile65: String[] = ['Rani','Olnee','RaniOlnee','profile65','Rani.Olnee@gmail.com'];
    this.people.set(this.people.size, new User(65, profile65, '07667269337', 'USD'));
    let profile66: String[] = ['Doralynne','Colleen','DoralynneColleen','profile66','Doralynne.Colleen@gmail.com'];
    this.people.set(this.people.size, new User(66, profile66, '07310099870', 'USD'));
    let profile67: String[] = ['Beverley','Jacqui','BeverleyJacqui','profile67','Beverley.Jacqui@gmail.com'];
    this.people.set(this.people.size, new User(67, profile67, '07936629451', 'USD'));
    let profile68: String[] = ['Ursulina','Weinreb','UrsulinaWeinreb','profile68','Ursulina.Weinreb@gmail.com'];
    this.people.set(this.people.size, new User(68, profile68, '07395825598', 'USD'));
    let profile69: String[] = ['Mara','Aloise','MaraAloise','profile69','Mara.Aloise@gmail.com'];
    this.people.set(this.people.size, new User(69, profile69, '07427517055', 'USD'));
    let profile70: String[] = ['Marcy','Emerson','MarcyEmerson','profile70','Marcy.Emerson@gmail.com'];
    this.people.set(this.people.size, new User(70, profile70, '07168359831', 'USD'));
    let profile71: String[] = ['Sibella','Adore','SibellaAdore','profile71','Sibella.Adore@gmail.com'];
    this.people.set(this.people.size, new User(71, profile71, '07991593494', 'USD'));
    let profile72: String[] = ['Mignon','Tengdin','MignonTengdin','profile72','Mignon.Tengdin@gmail.com'];
    this.people.set(this.people.size, new User(72, profile72, '07086940374', 'USD'));
    let profile73: String[] = ['Chickie','Remmer','ChickieRemmer','profile73','Chickie.Remmer@gmail.com'];
    this.people.set(this.people.size, new User(73, profile73, '07159195369', 'GBP'));
    let profile74: String[] = ['Jackie','Chan','jackie1','profile74','jackiechan@gmail.com'];
    this.people.set(this.people.size, new User(74, profile74, '07251474095', 'USD'));
    let profile75: String[] = ['Delilah','Dorine','DelilahDorine','profile75','Delilah.Dorine@gmail.com'];
    this.people.set(this.people.size, new User(75, profile75, '07623842302', 'USD'));
    let profile76: String[] = ['Mureil','Christal','MureilChristal','profile76','Mureil.Christal@gmail.com'];
    this.people.set(this.people.size, new User(76, profile76, '0000382824', 'USD'));
    let profile77: String[] = ['Mignon','Ammann','MignonAmmann','profile77','Mignon.Ammann@gmail.com'];
    this.people.set(this.people.size, new User(77, profile77, '07949638335', 'USD'));
    let profile78: String[] = ['Georgetta','Pattin','GeorgettaPattin','profile78','Georgetta.Pattin@gmail.com'];
    this.people.set(this.people.size, new User(78, profile78, '07539627075', 'USD'));
    let profile79: String[] = ['Loree','Eldrid','LoreeEldrid','profile79','Loree.Eldrid@gmail.com'];
    this.people.set(this.people.size, new User(79, profile79, '07740856183', 'USD'));
    let profile80: String[] = ['Zia','Craggie','ZiaCraggie','profile80','Zia.Craggie@gmail.com'];
    this.people.set(this.people.size, new User(80, profile80, '07819370419', 'USD'));
    let profile81: String[] = ['Aurelie','Manolo','AurelieManolo','profile81','Aurelie.Manolo@gmail.com'];
    this.people.set(this.people.size, new User(81, profile81, '07567157462', 'USD'));
    let profile82: String[] = ['Madelle','Ranjiv','MadelleRanjiv','profile82','Madelle.Ranjiv@gmail.com'];
    this.people.set(this.people.size, new User(82, profile82, '07054513588', 'USD'));
    let profile83: String[] = ['Jordan','Jarib','JordanJarib','profile83','Jordan.Jarib@gmail.com'];
    this.people.set(this.people.size, new User(83, profile83, '07833971386', 'USD'));
    let profile84: String[] = ['Leontine','Felecia','LeontineFelecia','profile84','Leontine.Felecia@gmail.com'];
    this.people.set(this.people.size, new User(84, profile84, '07515338512', 'USD'));
    let profile85: String[] = ['Madalyn','Imelida','MadalynImelida','profile85','Madalyn.Imelida@gmail.com'];
    this.people.set(this.people.size, new User(85, profile85, '07990813204', 'USD'));
    let profile86: String[] = ['Fanny','Bryna','FannyBryna','profile86','Fanny.Bryna@gmail.com'];
    this.people.set(this.people.size, new User(86, profile86, '07219357309', 'USD'));
    let profile87: String[] = ['Catharine','Karl','CatharineKarl','profile87','Catharine.Karl@gmail.com'];
    this.people.set(this.people.size, new User(87, profile87, '07850161132', 'USD'));
    let profile88: String[] = ['Micheline','Mathilde','MichelineMathilde','profile88','Micheline.Mathilde@gmail.com'];
    this.people.set(this.people.size, new User(88, profile88, '07035626771', 'USD'));
    let profile89: String[] = ['Emelina','Podvin','EmelinaPodvin','profile89','Emelina.Podvin@gmail.com'];
    this.people.set(this.people.size, new User(89, profile89, '07928091681', 'USD'));
    let profile90: String[] = ['Kerrin','Stover','KerrinStover','profile90','Kerrin.Stover@gmail.com'];
    this.people.set(this.people.size, new User(90, profile90, '07610582668', 'USD'));
    let profile91: String[] = ['Pollyanna','Schwejda','PollyannaSchwejda','profile91','Pollyanna.Schwejda@gmail.com'];
    this.people.set(this.people.size, new User(91, profile91, '07268920668', 'USD'));
    let profile92: String[] = ['Tani','Valerio','TaniValerio','profile92','Tani.Valerio@gmail.com'];
    this.people.set(this.people.size, new User(92, profile92, '07884714759', 'USD'));
    let profile93: String[] = ['Sophia','An','SophiaAn','profile93','Sophia.An@gmail.com'];
    this.people.set(this.people.size, new User(93, profile93, '07108036086', 'USD'));
    let profile94: String[] = ['Lizzie','Liva','LizzieLiva','profile94','Lizzie.Liva@gmail.com'];
    this.people.set(this.people.size, new User(94, profile94, '07472148386', 'USD'));
    let profile95: String[] = ['Keelia','Lory','KeeliaLory','profile95','Keelia.Lory@gmail.com'];
    this.people.set(this.people.size, new User(95, profile95, '07974243953', 'USD'));
    let profile96: String[] = ['Mariann','Raul','MariannRaul','profile96','Mariann.Raul@gmail.com'];
    this.people.set(this.people.size, new User(96, profile96, '07421619811', 'USD'));
    let profile97: String[] = ['Debee','Aloise','DebeeAloise','profile97','Debee.Aloise@gmail.com'];
    this.people.set(this.people.size, new User(97, profile97, '07948931880', 'USD'));
    let profile98: String[] = ['Clary','Bandeen','ClaryBandeen','profile98','Clary.Bandeen@gmail.com'];
    this.people.set(this.people.size, new User(98, profile98, '07792601282', 'USD'));
    let profile99: String[] = ['Clo','Phyllis','CloPhyllis','profile99','Clo.Phyllis@gmail.com'];
    this.people.set(this.people.size, new User(99, profile99, '07834724001', 'USD'));
    let profile100: String[] = ['Christian','Belanger','ChristianBelanger','profile100','Christian.Belanger@gmail.com'];
    this.people.set(this.people.size, new User(100, profile100, '07973088080', 'USD'));



// TODO more people like this:

    patryk.getAccount().deposit("GBP", 2150);
    let order = (patryk.getAccount().order("BTC", "GBP", 2000, 0, "03.01.2022 12:30") as Order)
    patryk.getAccount().executeTransaction(order)

    order = (patryk.getAccount().order("PLN", "BTC", 0.02, 0, "03.03.2022 15:30") as Order)
    patryk.getAccount().executeTransaction(order)

    order = (patryk.getAccount().order("USD", "BTC", 0.02, 0, "03.20.2022 05:21") as Order)
    patryk.getAccount().executeTransaction(order)

    patryk.getAccount().deposit("USD", 120);
    order = (patryk.getAccount().order("LUNA", "USD", 103, 0, "03.21.2022 12:31") as Order)
    patryk.getAccount().executeTransaction(order)

    order = (patryk.getAccount().order("ADA", "LUNA", 0.74, 0, "03.23.2022 07:21") as Order)
    patryk.getAccount().executeTransaction(order)

    order = (patryk.getAccount().order("LTC", "GBP", 131, 0, "03.28.2022 18:01") as Order)
    patryk.getAccount().executeTransaction(order)

// Orders for profile 1
    prof1.getAccount().deposit("XRP",437);
    order = (prof1.getAccount().order("EUR","XRP",422,0,"01.29.2022 16:21") as Order);
    prof1.getAccount().executeTransaction(order)

    order = (prof1.getAccount().order("USD","EUR",129,0,"02.01.2022 14:14") as Order);
    prof1.getAccount().executeTransaction(order)

    order = (prof1.getAccount().order("LUNA","USD",66,0,"02.10.2022 09:22") as Order);
    prof1.getAccount().executeTransaction(order)

    order = (prof1.getAccount().order("GBP","USD",11,0,"02.29.2022 19:44") as Order);
    prof1.getAccount().executeTransaction(order)

    order = (prof1.getAccount().order("USD","LUNA",0.21,0,"03.18.2022 22:22") as Order);
    prof1.getAccount().executeTransaction(order)

// Orders for profile 2
    prof2.getAccount().deposit("USD",950);
    order = (prof2.getAccount().order("BTC","USD",922,0,"01.18.2022 13:25") as Order);
    (this.people.get(1) as User).getAccount().executeTransaction(order);

    prof2.getAccount().deposit("AVAX",10)
    order = (prof2.getAccount().order("USD","AVAX",9.31,0,"02.11.2022 14:35") as Order);
    prof2.getAccount().executeTransaction(order)

    order = (prof2.getAccount().order("XRP","USD",216,0,"02.18.2022 16:21") as Order);
    prof2.getAccount().executeTransaction(order)

    order = (prof2.getAccount().order("GBP","USD",211,0,"02.19.2022 23:14") as Order);
    prof2.getAccount().executeTransaction(order)

    order = (prof2.getAccount().order("PLN","GBP",130,0,"03.01.2022 09:22") as Order);
    prof2.getAccount().executeTransaction(order)

    order = (prof2.getAccount().order("GBP","AVAX",0.53,0,"04.04.2022 14:14") as Order);
    prof2.getAccount().executeTransaction(order)

// Orders for profile3
    prof3.getAccount().deposit("USD",3000);

    order = (prof3.getAccount().order("BTC","USD",2300,0,"02.21.2022 12:21") as Order);
    prof3.getAccount().executeTransaction(order)

    order = (prof3.getAccount().order("GBP","BTC",0.02,0,"03.09.2022 21:02") as Order);
    prof3.getAccount().executeTransaction(order)

    order = (prof3.getAccount().order("XRP","USD",600,0,"03.21.2022 03:14") as Order);
    prof3.getAccount().executeTransaction(order)

    order = (prof3.getAccount().order("USD","XRP",250,0,"03.05.2022 09:22") as Order);
    prof3.getAccount().executeTransaction(order)

// Orders for profile4
    prof4.getAccount().deposit("GBP",1800);
    order = (prof4.getAccount().order("DOT","GBP",750,0,"01.19.2022 19:14") as Order);
    prof4.getAccount().executeTransaction(order)

    order = (prof4.getAccount().order("XRP","GBP",1000,0,"02.21.2022 12:51") as Order);
    prof4.getAccount().executeTransaction(order)

    order = (prof4.getAccount().order("USD","XRP",52,0,"03.03.2022 14:09") as Order);
    prof4.getAccount().executeTransaction(order)

    order = (prof4.getAccount().order("SOL","DOT",30,0,"03.09.2022 12:11") as Order);
    prof4.getAccount().executeTransaction(order)

    order = (prof4.getAccount().order("BTC","XRP",800,0,"03.29.2022 15:12") as Order);
    prof4.getAccount().executeTransaction(order)

// Orders for Mustafa
    mustafa.getAccount().deposit("CHF",500);
    mustafa.getAccount().deposit("TRY", 100000);
    mustafa.getAccount().deposit("LTC", 1000);
    mustafa.getAccount().deposit("BTC", 1);
    order = (mustafa.getAccount().order("GBP","CHF",441,0,"01.27.2022 10:16") as Order);
    mustafa.getAccount().executeTransaction(order)

    order = (mustafa.getAccount().order("XRP","GBP",300,0,"02.29.2022 23:14") as Order);
    mustafa.getAccount().executeTransaction(order)

    order = (mustafa.getAccount().order("EUR","XRP",225,0,"03.03.2022 15:09") as Order);
    mustafa.getAccount().executeTransaction(order)

    order = (mustafa.getAccount().order("PLN","EUR",90,0,"03.08.2022 11:19") as Order);
    mustafa.getAccount().executeTransaction(order)

    order = (mustafa.getAccount().order("USD","PLN",101,0,"03.11.2022 11:16") as Order);
    mustafa.getAccount().executeTransaction(order)

    order = (mustafa.getAccount().order("XRP","EUR",62,0,"03.19.2022 18:14") as Order);
    mustafa.getAccount().executeTransaction(order);

    mustafa.getAccount().deposit("USD",650);
    order = (mustafa.getAccount().order("AVAX","USD",541,0,"03.22.2022 11:31") as Order);
    mustafa.getAccount().executeTransaction(order);

    order = (mustafa.getAccount().order("SOL","USD",80,0,"03.08.2022 11:19") as Order);
    mustafa.getAccount().executeTransaction(order)

// Orders for profile 7
    prof7.getAccount().deposit("GBP",2500);

    order = (prof7.getAccount().order("BTC","GBP",2000,0,"02.21.2022 23:14") as Order);
    prof7.getAccount().executeTransaction(order)

    order = (prof7.getAccount().order("XRP","BTC",0.02,0,"02.21.2022 23:28") as Order);
    prof7.getAccount().executeTransaction(order)

    order = (prof7.getAccount().order("SOL","XRP",200,0,"03.31.2022 14:59") as Order);
    prof7.getAccount().executeTransaction(order)

    order = (prof7.getAccount().order("XRP","GBP",340,0,"04.01.2022 12:26") as Order);
    prof7.getAccount().executeTransaction(order)

    order = (prof7.getAccount().order("AVAX","BTC",0.02,0,"04.02.2022 07:24") as Order);
    prof7.getAccount().executeTransaction(order)

    order = (prof7.getAccount().order("GBP","AVAX",3.31,0,"04.03.2022 12:31") as Order);
    prof7.getAccount().executeTransaction(order)


    // Orders for Demo 1
    prof1000.getAccount().deposit("EUR",2500);

    order = (prof1000.getAccount().order("BTC","EUR",2000,0,"02.14.2022 21:14") as Order);
    prof1000.getAccount().executeTransaction(order)

    order = (prof1000.getAccount().order("LUNA","EUR",250,0,"02.17.2022 23:18") as Order);
    prof1000.getAccount().executeTransaction(order)

    order = (prof1000.getAccount().order("SOL","LUNA",2,0,"03.21.2022 21:19") as Order);
    prof1000.getAccount().executeTransaction(order)

    order = (prof1000.getAccount().order("XRP","BTC",0.03,0,"03.31.2022 14:26") as Order);
    prof1000.getAccount().executeTransaction(order)

    order = (prof1000.getAccount().order("AVAX","XRP",92,0,"04.04.2022 04:24") as Order);
    prof1000.getAccount().executeTransaction(order)

    order = (prof1000.getAccount().order("GBP","AVAX",0.22,0,"04.06.2022 11:34") as Order);
    prof1000.getAccount().executeTransaction(order)

    // Orders for demo 2
    prof1001.getAccount().deposit("GBP",2300);

    order = (prof1001.getAccount().order("AVAX","GBP",2000,0,"02.18.2022 12:51") as Order);
    prof1001.getAccount().executeTransaction(order)

    order = (prof1001.getAccount().order("EUR","AVAX",12,0,"02.21.2022 22:29") as Order);
    prof1001.getAccount().executeTransaction(order)

    order = (prof1001.getAccount().order("SOL","EUR",100,0,"02.30.2022 18:59") as Order);
    prof1001.getAccount().executeTransaction(order)

    order = (prof1001.getAccount().order("XRP","EUR",640,0,"03.11.2022 13:56") as Order);
    prof1001.getAccount().executeTransaction(order)

    order = (prof1001.getAccount().order("BTC","XRP",500,0,"04.02.2022 17:32") as Order);
    prof1001.getAccount().executeTransaction(order)

    order = (prof1001.getAccount().order("GBP","AVAX",3.31,0,"04.03.2022 12:11") as Order);
    prof1001.getAccount().executeTransaction(order)

    order = (prof1001.getAccount().order("DOT","GBP",200,0,"04.07.2022 09:12") as Order);
    prof1001.getAccount().executeTransaction(order)

    order = (prof1001.getAccount().order("USD","DOT",6.04,0,"04.08.2022 12:07") as Order);
    prof1001.getAccount().executeTransaction(order)
  }

  public static getInstance(): PersonManager {
    if (this.instance === null) {
      this.instance = new PersonManager()
    }
    return this.instance;
  }

  public getPersonByID(id: number): Person {
    return this.getPID(id);
  }

  public getPersonByEmail(email: String): Person {
    return this.getPEmail(email);
  }

  public addPerson(Person: number) {
    //  TODO - implement PersonManager.addPerson
    throw "UnsupportedOperationException";
  }

  public deletePersonByID(id: number): Person {
    //  TODO - implement PersonManager.deletePersonByID
    throw "UnsupportedOperationException";
  }

  public fetchUsersByQuery(query: String, caller: Person): UserJSON[] {

    let users: User[] = [];
    let maxes: number[] = [];
    let max = 0;
    let i = 0;
    let index = 0;

    this.people.forEach((value) => {
        // If there are more than one words in query than split them and put them in this array
        let split: String[];
        // Count the amount of words in 
        let wordsCount = (query.split(" ").length);
        split = query.split(" ", wordsCount);

        max = this.maxLevenstein(split, value.getFirstName()) + this.maxLevenstein(split, value.getSurName()) + this.maxLevenstein(split, value.getUsername());


        if (value && (value !== caller) && max >= 0.50 * split.length) {
          users[index] = value as User;
          maxes[index] = max;
          i++;
          index++;
        } else {
          i++;
        }
      }
    );
    
    if(maxes.length == 0)
    {
      return [];
    }

    for (let i = 0; i < maxes.length; i++) {
      for (let j = 0; j < maxes.length - 1; j++) {

        if (maxes[j] < maxes[j + 1]) {
          let swap = maxes[j];
          let swapUser = users[j]
          maxes[j] = maxes[j + 1];
          users[j] = users[j + 1];
          maxes[j + 1] = swap;
          users[j + 1] = swapUser;
        }
      }
    }

    let maxLength = 20;
    
    let limit = Math.min(maxLength,index)

    let usersJSON: UserJSON[] = [];
    for (let j = 0; j < limit; j++) {
      usersJSON[j] = {
        id: users[j].getID(), name: users[j].getFullName(), username: users[j].getUsername()
      }
    }
    
    return usersJSON;
  }


  private levenshtein(a: String, b: String): number {
    const an = a ? a.length : 0;
    const bn = b ? b.length : 0;
    if (an === 0) {
      return bn;
    }
    if (bn === 0) {
      return an;
    }
    const matrix = new Array<number[]>(bn + 1);
    for (let i = 0; i <= bn; ++i) {
      let row = matrix[i] = new Array<number>(an + 1);
      row[0] = i;
    }
    const firstRow = matrix[0];
    for (let j = 1; j <= an; ++j) {
      firstRow[j] = j;
    }
    for (let i = 1; i <= bn; ++i) {
      for (let j = 1; j <= an; ++j) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1], // substitution
            matrix[i][j - 1], // insertion
            matrix[i - 1][j] // deletion
          ) + 1;
        }
      }
    }
    return (b.length - matrix[bn][an]) / b.length;
  }

  private maxLevenstein(words: String[], compare: String): number {
    let maximum = 0;

    for (let i = 0; i < words.length; i++) {
      maximum = Math.max(this.levenshtein(words[i], compare), maximum);
    }

    return maximum;
  }

  private getPID(id: number): Person {
    let found: boolean = false;
    let person: Person;
    this.people.forEach(function (value) {
      if (!found && value.getID() === id) {
        found = true;
        person = value;
      }
    });
    if (person! != undefined) {
      return person;
    } else {
      throw "UserNotFound"
    }
  }

  private getPEmail(email: String): Person {
    let found: boolean = false;
    let person: Person;
    this.people.forEach(function (value) {
      if (!found && value.getEmail() === email) {
        found = true;
        person = value;
      }
    });
    if (person!) {
      return person;
    } else {
      throw "UserNotFound"
    }
  }
}

