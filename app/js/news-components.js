var NewsAdminContainer = React.createClass({
  render() {
    return (
      <div className="container">
        <NewsCreateContainer news={this.props.singleNews} />
        <NewsEditContainerTable news={this.props.news} />
      </div>
    );
}});

var NewsCreateContainer = React.createClass({
  render() {
    return (
      <div className='row with-top-padding'>
        <NewsEditor news={this.props.news} />
        <NewsCreateControls />
      </div>
    );
}});

var NewsCreateControls = React.createClass({
  render() {
    return (
      <div className='col-md-3'>
      <div className='row with-padding'>
        <input type='button' className='btn btn-primary center-block' value='Dodaj' />
      </div>
    </div>
    );
}});

var NewsEditContainerTable = React.createClass({
  render() {
    var rows = _.map(this.props.news, news => { return <NewsEditContainer news={news} /> });
    return (
      <div className='row'>
        {rows}
      </div>
    );
}});

var NewsEditContainer = React.createClass({
  render() {
    return (
      <div>
        <NewsEditor news={this.props.news} />
        <NewsEditControls />
      </div>
    );
}});

var NewsEditor = React.createClass({
  render() {
    return (
      <div className='col-md-9 with-top-padding'>
        <div className='row'>
          <div className="col-xs-1">Tytuł</div>
          <div className='col-xs-11'>
            <input type='text' className='title full-width' value={this.props.news.title} />
          </div>
        </div>
        <div className='row'>
          <div className="col-xs-1">Data</div>
          <div className='col-xs-11'>
            <input type='text' className='datepicker createdDate' value={this.props.news.createdDate} />
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <textarea className='body full-width' rows='8' value={this.props.news.body}></textarea>
          </div>
        </div>
      </div>
    );
}});

var NewsPreview = React.createClass({
  rawMarkup() {
    return { __html: marked(this.props.body, {sanitize: true}) };
  },
  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={this.rawMarkup()}></div>
      </div>
    );
}});

var NewsEditControls = React.createClass({
  render() {
    return (
      <div>
        <div className='col-md-3'>
          <div className='row with-padding'>
            <input type="button" className='btn btn-primary center-block btn-news-save' value='Zapisz' />
          </div>
          <div className='row with-padding'>
            <input type="button" className='btn btn-primary center-block btn-news-delete' value='Usuń' />
          </div>
        </div>
      </div>
    );
}});

var SINGLE_NEWS = {
  "createdDate": "2015-09-30",
  "title": "To jest tytul.",
  "body": "**To jest tytul.**"
};

var NEWS = [
  {
    "id": 22,
    "createdDate": "2015-09-30",
    "title": "Test 22",
    "body": "* Test 1\n* Test 2\n* Test 3\n* Test 4"
  },
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

React.render(<NewsAdminContainer news={NEWS} singleNews={SINGLE_NEWS} />, document.getElementById('news'));
