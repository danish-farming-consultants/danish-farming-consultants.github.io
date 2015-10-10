var NewsContainer = React.createClass({render() {
  return (
    <div>
      <div>NewsContainer</div>
      <NewNews />
      <NewsTable />
    </div>
  );
}});

var NewNews = React.createClass({render() {
  return (
    <div>
      <div>NewNews</div>
      <NewsPreview />
    </div>
  );
}});

var NewsTable = React.createClass({render() {
  return (
    <div>
      <div>NewsTable</div>
      <NewsRow />
    </div>
  );
}});

var NewsRow = React.createClass({render() {
  return (
    <div>
      <div>NewsRow</div>
      <NewsBody />
      <NewsPreview />
      <NewsBtns />
    </div>
  );
}});

var NewsBody = React.createClass({render() {
  return (
    <div>
      <div>NewNews</div>
    </div>
  );
}});

var NewsPreview = React.createClass({render() {
  return (
    <div>
      <div>NewsPreview</div>
    </div>
  );
}});

var NewsBtns = React.createClass({render() {
  return (
    <div>
      <div>NewsBtns</div>
    </div>
  );
}});

var NEWS = [
  {
    "id": 24,
    "createdDate": "2015-09-30",
    "title": "Poszukujemy pracowników",
    "body": "Aktualnie poszukujemy kandydatów na stanowisko:\nOBSŁUGA TRZODY CHLEWNEJ\n\n\nWymagania :\n* znajomość min. podstaw hodowli trzody chlewnej,\n* odpowiedzialność i zaangażowanie w pracę,\n* wykształcenie rolnicze (średnie) będzie dodatkowym atutem.\n\n\nOferujemy:\n* zatrudnienie w firmie o ugruntowanej pozycji na rynku,\n* dynamiczną i interesującą pracę,\n* możliwość doskonalenia posiadanych i zdobywania nowych umiejętności.\n \n\nPoza wynagrodzeniem zapewniamy:\n* pozafinansowy system motywacyjny oraz  pakiet socjalny m.in.: \n  * coroczny piknik dla wszystkich pracowników z rodzinami,\n  * imprezy integracyjne,\n  * dopłaty do wyjazdów zorganizowanych dla dzieci pracowników,\n  * bony okolicznościowe,\n  * dodatkowe ubezpieczenie.\n\n\nAplikacje wraz z oświadczeniem o zgodzie na przetwarzanie danych osobowych w celach rekrutacji przez Danish Farming Consultants Sp. zo.o. siedzibą w Rzeczycach przy ul. Piaskowej 16, (zgodnie z Ustawą z dn. 29.sierpnia 1997 o Ochronie Danych Osobowych Dz. U. Nr 133, poz. 883) prosimy przesyłać adres e-mail: [hr@dfc.slask.pl](mailto:hr@dfc.slask.pl) Jednocześnie zastrzegamy sobie prawo do kontaktu wyłącznie z wybranymi kandydatami."
  },
  {
    "id": 23,
    "createdDate": "2015-09-24",
    "title": "Sprzedaż Brony Talerzowej",
    "body": "Posiadamy do sprzedania używaną Bronę Talerzową Väderstad Carrier CR 650.\nSzczegóły oferty dostępne pod [adresem](http://www.traktorpool.de/pl/details/Scheibeneggen/Vaederstad-Carrier-CR-650/2509897/)."
  }
];

React.render(<NewsContainer news={NEWS} />, document.getElementById('news'));
