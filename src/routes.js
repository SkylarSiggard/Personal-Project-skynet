import React from 'react'
import Create from './components/Create/Create'
import Lander from './components/Lander/Lander'
import List from './components/List/List'
import Everyone from './components/EveryEvent/EveryEvent'
import About from './components/About/About'
import {Switch, Route} from 'react-router-dom'


export default (   
    <Switch>
        <Route exact path='/' component={Lander}/>
        <Route exact path='/about' component={About}/>
        <Route path='/create' component={Create}/>
        <Route path='/list' component={List}/>
        <Route path='/every' component={Everyone}/>
    </Switch>
)
