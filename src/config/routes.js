import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../containers/Home';

import NewsList from '../containers/NewsList';
import NewsDetail from '../containers/NewsDetail';

import CatalogTicketsDiscounts from '../containers/CatalogTicketsDiscounts';
import CatalogTickets from '../containers/CatalogTickets';
import CatalogTicketsDetail from '../containers/CatalogTicketsDetail';

import Profile from '../containers/Profile';
import CatalogRealty from '../containers/CatalogRealty';
import CatalogRealtyDetail from '../containers/CatalogRealtyDetail';
import CatalogRentals from '../containers/CatalogRentals';
import CatalogRentalsDetail from '../containers/CatalogRentalsDetail';

import Support from '../containers/Support';
import NotFoundPage from '../containers/NotFoundPage';

import AdminComponent from '../containers/Auth/Admin'
import LoginComponent from '../containers/Auth/Login'
import Verify from '../containers/Auth/Verify'


import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAdminRedir,
         userIsAuthenticated, userIsNotAuthenticated } from '../auth'


// Need to apply the hocs here to avoid applying them inside the render method
const Login = userIsNotAuthenticatedRedir(LoginComponent)
const Admin = userIsAuthenticatedRedir(userIsAdminRedir(AdminComponent))

// const ProtectedUserStocks = userIsAuthenticatedRedir(UserStocks)
// const ProtectedUserStocksAdd = userIsAuthenticatedRedir(UserStocksAdd)


export default (
  <Switch>
    <Route exact path="/" component={Home}/>

    <Route path="/p/discounts/:slug/" component={CatalogTicketsDiscounts}/>

    <Route exact path="/p/news/" component={NewsList}/>
    <Route path="/p/news/:slug/" component={NewsDetail}/>

    <Route exact path="/p/tickets/" component={CatalogTickets}/>
    <Route exact path="/p/tickets/categories/:category/" component={CatalogTickets}/>
    <Route exact path="/p/tickets/:slug/" component={CatalogTicketsDetail}/>
    <Route exact path="/p/tickets/:slug/:discount_code/" component={CatalogTicketsDetail}/>
    <Route path="/p/tickets/:slug/reviews/:slug_review/" component={CatalogTicketsDetail}/>

    <Route path="/p/profile/:id/" component={Profile}/>

    <Route exact path="/p/realty/" component={CatalogRealty}/>
    <Route path="/p/realty/:id/" component={CatalogRealtyDetail}/>

    <Route exact path="/p/rentals/" component={CatalogRentals}/>
    <Route path="/p/rentals/:id/" component={CatalogRentalsDetail}/>

    <Route exact path="/p/support/" component={Support}/>

    <Route exact path="/p/login" component={Login}/>
    <Route exact path="/p/signup" component={Login}/>
    <Route path="/p/login/reset/:password_reset_uid/:password_reset_token" component={Login}/>
    <Route path="/p/verify/:token" component={Verify}/>

    <Route component={CatalogTickets} />

  </Switch>
);
