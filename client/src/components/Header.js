import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
class Header extends Component {
  renderContent() {
    switch(this.props.auth) {
      case false:
      return <li> <a href="/auth/google">Login with Google</a></li>
      case null:
      return 'Pending';
      default:
      return <li> <a href="/api/logout">Logout</a> </li>
    }
  }
  render() {
    console.log("=======Header props:"+JSON.stringify(this.props))
    return (
      <nav>
        <div className = "nav-wrapper">
          <Link
           to={this.props.auth ? '/surveys' : '/'}
           className = "left brand-logo"
           >
          Emaily
          </Link>
          <ul className = "right">
          {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}
function mapStateToProps({auth}) {
  return {auth}
}
export default connect(mapStateToProps)(Header);
