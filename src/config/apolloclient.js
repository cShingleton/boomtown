import ApolloClient, { createNetworkInterface } from 'react-apollo';
import { applyMiddleware } from 'apollo-client';
import { FireBaseAuth } from './firebase';

const networkInterface = createNetworkInterface({
    uri: 'http://localhost:4000/graphql'
});

networkInterface.use([{
    async applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};
        }
        const token = await FireBaseAuth.currentUser.getIdToken(true);
        req.options.headers['Authorization'] = token;
        next();
    }
}]);

const client = new ApolloClient({ networkInterface, connectToDevTools: true });

export default client;
