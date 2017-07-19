// absolute imports
import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

// relative imports
import Routes from './routes/';
import store from './redux/store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import muiTheme from './config/theme';
import Layout from './components/Layout';


injectTapEventPlugin();

export const history = createHistory();

const Boomtown = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Layout>
                    <Routes />
                </Layout>
            </ConnectedRouter>
        </Provider>
    </MuiThemeProvider>

);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
