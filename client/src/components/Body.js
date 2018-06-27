import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import Landing from './Landing'

class Body extends Component {
  renderContent() {
    switch(this.props.auth) {
      case false:
      return <Landing />
      case null:
      return (
        <div style={{textAlign:'center'}}>
          <h1>
            Checking Login...
          </h1>
        </div>
      )
      default:
      return (
        <div style={{textAlign:'center'}}>
          <h1>
            Dashboard, start driving....
          </h1>
        </div>
      )
    }
  }
  render() {
    return (
      <div> {this.renderContent() }</div>
    );
  }
}
function mapStateToProps({auth}) {
  return {auth}
}
export default connect(mapStateToProps)(Body);
