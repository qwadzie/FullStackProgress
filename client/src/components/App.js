import React, {Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from '../actions'

import Header from './Header';
import Landing from './Landing'

const Dashboard = ()=><h2>Dashboard</h2>
const SurveyNew = ()=><h2>SurveyNew</h2>

class App extends Component {
  componentWillUnmount() {
    alert("will unmount")
    window.removeEventListener('resize',this.handleResize);
    window.removeEventListener('focus',this.handleFocus);
  }
  componentDidMount() {
    //alert("did mount")
    window.addEventListener('resize',this.handleResize);
    window.addEventListener('focus',this.handleFocus);
    this.props.fetchUser();
  }
  handleResize() {
    alert("resize event")
  }
  handleFocus() {
    console.log("<><><><><><>>>--->Focus event")
  }
  render() {
    return (
    <div className='container'>
    <BrowserRouter>
    <div>
    <Header />
    <Route path="/" exact component={Landing} />
    <Route path="/surveys" exact component={Dashboard} />
    <Route path="/surveys/new" component={SurveyNew} />
    </div>
    </BrowserRouter>
    </div>
    );
}
  }
export default connect(null,actions)(App);
