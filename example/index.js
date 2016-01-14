import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import { render } from 'react-dom'

import Page from './page'
import NoMatch from './404'
import One from './one'
import Navigation from './navigation'
import Users from './users'

render(
    (
            <Router history={browserHistory}>
                <Route path="/" component={Page}>
                    <Route path="one" component={One}/>
                    <Route path="navigation" component={Navigation}/>
                    <Route path="users" component={Users}>
                        
                    </Route>
                    <Route path="*" component={NoMatch}/>
                </Route>
            </Router>
    ), document.querySelector('#application')
);