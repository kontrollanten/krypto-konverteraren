import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

history.listen(location => {
  gtag('config', 'UA-117408065-1', {'page_path': location.pathname + location.search});
});

export default history;
