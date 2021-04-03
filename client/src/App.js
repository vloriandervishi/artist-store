import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import searchArt from './pages/SearchArt';
import savedArts from './pages/SavedArt';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  request: (operation)=>{
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers:{
        authorization: token ? `Bearer ${token}`: '',
      },
    });
  },
  uri: '/graphql',

   
});
// const httpLink = createHttpLink({
//   uri: '/api',
// });
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('id_token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={searchArt} />
          <Route exact path='/saved' component={savedArts} />
          
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>

  );
}

export default App;
