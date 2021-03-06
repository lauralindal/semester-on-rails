import React from 'react';
import Login from './Login';
import HoodieRepository from './HoodieRepository';

class Header extends React.Component {

  chooseSignInStatus(isLoggedIn) {
    if (isLoggedIn) {
      return <div> <h3 className="four columns" >Hello Hooman!</h3> <button className="button-primary two columns" type="button" value="Logout" onClick={this.props.performLogout}>Logout</button></div>;
    }
    return <Login performLogin={this.props.performLogin} />;
  }

  render() {
    var isLoggedIn = new HoodieRepository().isSignedIn();
    return (
      <header>
      <div className="row">
        <h1 className="six columns">Dein Semesterplaner</h1>
        {this.chooseSignInStatus(isLoggedIn)}
      </div>
      </header>
    )
  }
}

export default Header
