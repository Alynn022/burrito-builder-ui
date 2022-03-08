import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
      .then(data => {
        this.setState({orders: data.orders})
      })
      .catch(err => console.error('Error fetching:', err));
  }

  addOrder = (newOrder) => {
    fetch('http://localhost:3001/api/v1/orders',
      {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify (newOrder)
      })
    .then(response => response.ok)
    .then(() => this.setState({ orders : [...this.state.orders, newOrder]}))
    .catch(() => 'Sorry, please try again.')
  }


  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
