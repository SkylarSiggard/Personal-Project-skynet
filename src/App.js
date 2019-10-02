import React, {Component} from 'react';
import './App.css';
import routes from './routes'

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(user) {
    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default App;

