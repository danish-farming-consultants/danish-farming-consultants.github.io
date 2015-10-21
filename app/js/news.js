const NewsAdminContainer = React.createClass({
  onNewNewsEdit(id, createdDate, title, body, language) {
    this.setState({
      newNews: {
        createdDate: createdDate,
        title: title,
        body: body,
        language: language
      }
    });
  },
  onNewsEdit(id, createdDate, title, body, language) {
    const newNews = _.map(this.state.news, news => {
      if (news.id === id) {
        return { id: id, createdDate: createdDate, title: title, body: body, language: language };
      } else {
        return news;
      }
    });
    this.setState({news: newNews});
  },
  emptyNews() {
    return {
      createdDate: new Date().toISOString().slice(0, 10),
      title: '',
      body: '',
      language: 'pl'
    }
  },
  onDelete(id) {
    this.props.onDelete(id).done(() => {
      this.setState({
        news: _.filter(this.state.news, news => news.id !== id)
      });
    });
  },
  onCreate() {
    const newNews = this.state.newNews;
    this.props.onCreate(newNews.createdDate, newNews.title, newNews.language, newNews.body).done(saved => {
      this.setState({
        newNews: this.emptyNews(),
        news: [saved].concat(this.state.news)
      });
    });
  },
  getInitialState() {
    return {
      newNews: this.emptyNews(),
      news: []
    };
  },
  componentDidMount() {
    this.props.newsPromise.done(news => this.setState({news: news}));
  },
  render() {
    return (
      <div className='container'>
        <NewsCreateContainer news={this.state.newNews} onEdit={this.onNewNewsEdit} onCreate={this.onCreate} />
        <NewsEditContainerTable news={this.state.news} onEdit={this.onNewsEdit} onSave={this.props.onSave} onDelete={this.onDelete} />
      </div>
    );
}});

const NewsCreateContainer = React.createClass({
  render() {
    return (
      <div className='row'>
        <NewsEditor news={this.props.news} onEdit={this.props.onEdit} />
        <NewsCreateControls onCreate={this.props.onCreate} />
      </div>
    );
}});

const NewsCreateControls = React.createClass({
  render() {
    return (
      <div className='col-md-1'>
      <div className='row with-padding'>
        <input type='button' className='btn btn-primary center-block' value='Dodaj' onClick={this.props.onCreate} />
      </div>
    </div>
    );
}});

const NewsEditContainerTable = React.createClass({
  render() {
    const rows = _.map(this.props.news, news => <NewsEditContainer news={news} onEdit={this.props.onEdit} onSave={this.props.onSave} onDelete={this.props.onDelete} />);
    return (
      <div className='row'>
        {rows}
      </div>
    );
}});

const NewsEditContainer = React.createClass({
  render() {
    return (
      <div>
        <NewsEditor news={this.props.news} onEdit={this.props.onEdit} />
        <NewsEditControls news={this.props.news} onSave={this.props.onSave} onDelete={this.props.onDelete} />
      </div>
    );
}});

const NewsEditor = React.createClass({
  initDatepicker() {
    $(React.findDOMNode(this.refs.createdDate)).datepicker({
      format: 'yyyy-mm-dd',
      todayBtn: 'linked',
      language: 'pl',
      autoclose: true,
      todayHighlight: true
    }).on('changeDate', () => this.handleEdit());
  },
  handleEdit() {
    this.props.onEdit(
      this.props.news.id,
      React.findDOMNode(this.refs.createdDate).value,
      React.findDOMNode(this.refs.title).value,
      React.findDOMNode(this.refs.body).value,
      React.findDOMNode(this.refs.language).value
    );
  },
  componentDidMount() {
    this.initDatepicker();
  },
  render() {
    return (
      <div className='col-md-11 with-top-padding'>
        <div className='row'>
          <div className='col-xs-1'>Tytuł</div>
          <div className='col-xs-11'>
            <input type='text' className='full-width' value={this.props.news.title} ref='title' onChange={this.handleEdit} />
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-1'>Data</div>
          <div className='col-xs-11'>
            <input type='text' value={this.props.news.createdDate} ref='createdDate' onChange={this.handleEdit} />
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-1'>Język</div>
          <div className='col-xs-11'>
            <select class='form-control' value={this.props.news.language} ref='language' onChange={this.handleEdit}>
              <option value='pl'>pl</option>
              <option value='eng'>eng</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-6'>
            <textarea className='full-width body-editor' value={this.props.news.body} ref='body' onChange={this.handleEdit}></textarea>
          </div>
          <div className='col-xs-6 news-preview' ref='bodyPreview'>
            <NewsPreview body={this.props.news.body} />
          </div>
        </div>
      </div>
    );
}});

const NewsPreview = React.createClass({
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

const NewsEditControls = React.createClass({
  render() {
    const news = this.props.news;
    return (
      <div>
        <div className='col-md-1'>
          <div className='row with-padding'>
            <input type='button' className='btn btn-primary center-block' value='Zapisz' onClick={() => this.props.onSave(news.id, news.createdDate, news.title, news.language, news.body)} />
          </div>
          <div className='row with-padding'>
            <input type='button' className='btn btn-primary center-block' value='Usuń' onClick={() => this.props.onDelete(news.id)} />
          </div>
        </div>
      </div>
    );
}});

const news = (function () {
  function success(msg) {
    $.notify(msg, {type: 'success', delay: 1000, placement: {from: 'bottom', align: 'center'}});
  }

  function error(msg) {
    $.notify(msg, {type: 'danger', delay: 3000, placement: {from: 'bottom', align: 'center'}});
  }

  function create(createdDate, title, language, body) {
    return $.ajax({
      type: 'POST',
      url: api.postNews,
      data: JSON.stringify({createdDate: createdDate, title: title, language: language, body: body}),
      contentType : 'application/json',
      success: () => success('Artykuł został dodany!'),
      error: () => error('Bład podczas dodawania!')
    });
  }

  function deleteNews(id) {
    return $.ajax({
      type: 'DELETE',
      url: api.deleteNews,
      data: JSON.stringify({id: id}),
      contentType : 'application/json',
      success: () => success('Artykuł został usunięty!'),
      error: () => error('Bład podczas usuwania!')
    });
  }

  function save(id, createdDate, title, language, body) {
    return $.ajax({
      type: 'PUT',
      url: api.putNews,
      data: JSON.stringify({id: id, createdDate: createdDate, title: title, language: language, body: body}),
      contentType : 'application/json',
      success: () => success('Artykuł został zapisany!'),
      error: () => error('Bład podczas zapisywania!')
    });
  }

  function getAll() {
    return $.getJSON(api.getNews);
  }

  return {
    create: create,
    save: save,
    deleteNews: deleteNews,
    getAll: getAll
  }
})();

React.render(<NewsAdminContainer newsPromise={news.getAll()} onCreate={news.create} onSave={news.save} onDelete={news.deleteNews} />, document.getElementById('news'));
