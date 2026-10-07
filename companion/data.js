// Independent fictional placeholders; no content from The Island of the Dead.
const DEMO = {
  id:'demo-placeholders', name:'DEMO · testowanie bez spoilerów', demo:true,
  current:'demo-a', session:1, day:1, hour:12, foundry:'',
  locations:[
    {id:'demo-a',name:'Lokacja A · punkt startowy',player:'[Opis dla graczy] Neutralne pomieszczenie z drzwiami do lokacji B.',gm:'[Notatka MG] Tutaj możesz przetestować opis lokacji i wysyłanie go do Foundry.',x:22,y:65},
    {id:'demo-b',name:'Lokacja B · korytarz',player:'[Opis dla graczy] Korytarz łączy lokacje A i C.',gm:'[Sekret MG] Przykładowy ukryty szczegół; nie pochodzi z żadnego scenariusza.',x:50,y:45},
    {id:'demo-c',name:'Lokacja C · sala finałowa',player:'[Opis dla graczy] Pusta sala z przykładowym przedmiotem.',gm:'[Notatka MG] Dowolna sytuacja do testowania.',x:78,y:25}
  ],
  links:[['demo-a','demo-b'],['demo-b','demo-c']],
  pcs:[
    {id:'demo-pc1',name:'Postać testowa 1',role:'[Archetyp]',gm:'[Dark Secret] Wpisz tu fikcyjny sekret.',thread:'[Wątek osobisty] Odnalezienie przykładowego NPC.',trigger:'[Trigger] Spotkanie z NPC testowym.',player:'[Opis PC] Materiał demonstracyjny.'},
    {id:'demo-pc2',name:'Postać testowa 2',role:'[Archetyp]',gm:'[Dark Secret] Drugi fikcyjny sekret.',thread:'[Wątek osobisty] Zbadanie przykładowej wskazówki.',trigger:'[Trigger] Odkrycie wskazówki.',player:'[Opis PC] Możesz swobodnie zmienić wszystkie pola.'}
  ],
  scenes:[
    {id:'demo-scene1',name:'Scena testowa · wejście',location:'demo-a',player:'[Opis sceny] Bohaterowie spotykają się w lokacji A.',gm:'[Przebieg] Przypisz dowolną scenę Foundry i sprawdź przycisk Pokaż graczom.',status:'available',foundryScenes:{}},
    {id:'demo-scene2',name:'Scena testowa · spotkanie',location:'demo-b',player:'[Opis sceny] Przykładowy NPC czeka w korytarzu.',gm:'[Przebieg] Test edycji i oznaczenia sceny jako rozegranej.',status:'available',foundryScenes:{}}
  ],
  events:[
    {id:'demo-e1',name:'Wydarzenie testowe · dostępne',location:'demo-a',pc:'',trigger:'[Warunek] Wejście do lokacji A.',gm:'[Opis MG] Zmień status na W toku lub Rozegrane, aby sprawdzić filtrowanie dashboardu.',status:'available'},
    {id:'demo-e2',name:'Wydarzenie testowe · osobiste',location:'demo-b',pc:'demo-pc1',trigger:'[Warunek] Rozmowa z NPC testowym.',gm:'[Konsekwencje] Wpisz własną reakcję postaci.',status:'available'},
    {id:'demo-e3',name:'Wydarzenie testowe · ogólne',location:'*',pc:'',trigger:'[Warunek] Decyzja MG.',gm:'[Opis MG] Dostępne w każdej lokacji.',status:'active'}
  ],
  templates:[{id:'demo-template',name:'Szablon testowy · osobisty wątek',location:'*',gm:'[Inspiracja] Dostosuj ten neutralny szablon do wybranego PC.',trigger:'[Trigger] Dowolny warunek.'}],
  npc:[
    {id:'demo-npc1',name:'NPC testowy',role:'[Rola NPC]',location:'demo-b',pc:'demo-pc1',gm:'[Sekret MG] Zna rozwiązanie przykładowej zagadki.',player:'[Wiedza graczy] Czeka w korytarzu.',status:'unknown',foundry:''},
    {id:'demo-npc2',name:'Duch testowy',role:'[Duch]',location:'demo-c',pc:'demo-pc2',gm:'[Motywacja] Chce przekazać neutralną wiadomość.',player:'[Wiedza graczy] Nie została jeszcze ujawniona.',status:'unknown',foundry:''}
  ],
  clues:[{id:'demo-clue',name:'Wskazówka testowa',location:'demo-a',gm:'[Prawda MG] Przykładowe rozwiązanie zagadki.',player:'[Opis dla graczy] Kartka z symbolem i literą B.',status:'hidden'}],
  items:[{id:'demo-item',name:'Przedmiot testowy',location:'demo-a',gm:'[Opis] Neutralny rekwizyt do testowania statusów: odkryty, zabrany, użyty.',status:'hidden',owner:''}],
  notes:[{id:'demo-note',name:'Notatka testowa',location:'demo-a',pc:'demo-pc1',gm:'[Treść] To bezpieczne miejsce do sprawdzania edycji, usuwania i kopii danych.'}],
  timeline:[{id:'demo-log',text:'Przykładowy wpis osi czasu — dane demonstracyjne.',at:'2026-01-01T12:00:00Z',day:1,hour:12,session:1}],
  world:{weather:'[Pogoda] Neutralna',alarm:'[Alarm] Brak',illusion:'[Stan] Przykładowy'},
  tracks:[{id:'demo-track',name:'Zagrożenie testowe',value:1,max:4,steps:['Etap 1 · sygnał','Etap 2 · narastanie','Etap 3 · komplikacja','Etap 4 · konsekwencja']}],
  resources:[{id:'demo-resource1',name:'Zapas testowy',value:5,unit:'sztuki'},{id:'demo-resource2',name:'Energia testowa',value:3,unit:'punkty'}]
};
