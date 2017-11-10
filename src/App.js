/*
Name: Brandon Karl, brandon_karl@student.uml.edu
Computer Science Department, UMass Lowell
Comp.4610, GUI Programming I
File: /usr/cs/2018/bkarl/public_html/
Created: 10-nov-2017
Last updated by HL: 10-Nov-2017, 8:17
*/

import React, { Component } from 'react';
import './css/App.css';

// State for app, initial
class App extends Component {
  state = {
    form: 'initialInfoForm',
    milesDriven: '',
    costPG: '',
    prices: [],
    price1: '',
    price2: '',
    price3: '',
    mpgs: [],
    mpg: '',
    displayTable: { display: 'none' },
    displayMessage: {},
    errors: {}
  }

  // Take what is in form, add it to state
  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value]
    })
  }

  // Logic to get miles driven and cost of gas
  addInitialInfo = (e) => {
    e.preventDefault()
    const { milesDriven, costPG } = this.state
    let errors = {}
    let isValid = true;
    if (isNaN(milesDriven) || milesDriven == '') {
      errors.milesDriven = 'Must be a number'
      isValid = false
    }
    if (isNaN(costPG) || costPG == '') {
      errors.costPG = 'Must be a number'
      isValid = false
    }
    
    if(isValid) {
      // If all data vaid, show next form
      this.setState({ form: 'carPricesForm' })
    }
    else {
      // if invalid, show errors
      this.setState({ errors })
    }
  }

  // Logic to add possible prices to array
  enteredPrices = (e) => {
    e.preventDefault()
    let errors = {}
    let isValid = true;
    let { prices, price1, price2, price3 } = this.state
    if (isNaN(price1) || price1 == '') {
      errors.price1 = 'Must be a number'
      isValid = false
    }
    if (isNaN(price2) || price2 == '') {
      errors.price2 = 'Must be a number'
      isValid = false
    }
    if (isNaN(price3) || price3 == '') {
      errors.price3 = 'Must be a number'
      isValid = false
    }

    if (isValid) {
      // If valid, save array of prices
      prices.push(price1, price2, price3)
      // Go to next form, show table
      this.setState({ prices, form: 'MPGForm', displayTable: {}, displayMessage: { display: 'none' } })
    }
    else {
      // If invalid show errors
      this.setState({ errors })
    }
  }

  // Add a row to the table based on mpg input
  addOffer = (e) => {
    e.preventDefault()
    let { mpgs, mpg, milesDriven, costPG, prices } = this.state
    let errors = {}
    let isValid = true;
    if (isNaN(mpg) || mpg == '') {
      errors.mpg = 'Must be a number'
      isValid = false
    }
    if (isValid) {
      // Total cost calculation
      prices = prices.map((price, i) => {
        const total = Math.round(Number(price) + ((Number(milesDriven) / Number(mpg)) * Number(costPG)))
        let perMile = total / Number(milesDriven)
        perMile.toFixed(2)
        return {
          total,
          perMile
        }
      })
      // Add to array of rows
      mpgs.push({
        value: mpg,
        totals: prices
      })
      // Reset form to nothing
      this.setState({
        mpgs,
        mpg: ''
      })
    }
    else {
      // If invalid show errors
      this.setState({ errors })
    }
  }

  render() {
    // Form for initial info, for calculation purposes
    const initalInfoForm = (
      <div>
        <h1>Lets Get Started</h1>
        <h3>Some Setup Information</h3>
        <form>
          <div className="row">
            <div className="col-sm-6">
              <label for="milesDriven">Miles you expect to dive, over life of car</label>
              <input type="text" onChange={this.onChange} value={this.state.milesDriven} className="myInput" name="milesDriven"/>
              {this.state.errors.milesDriven && <span>{this.state.errors.milesDriven}</span>}
            </div>
            <div className="col-sm-6">
              <label for="costPG">Cost for a gallon of gass ($)</label>
              <input type="text" onChange={this.onChange} value={this.state.costPG} className="myInput" name="costPG"/>
              {this.state.errors.costPG && <span>{this.state.errors.costPG}</span>}
            </div>
          </div>
          <button onClick={this.addInitialInfo} type="button" class="btn btn-primary">Next</button>
        </form>
      </div>
    )

    // 3 inputs for car values
    const carPricesForm = (
      <div>
        <h1>Lets Talk Price</h1>
        <h3>Enter 3 Possible Car Prices To Compare</h3>
        <form>
          <div className="row">
            <div className="col-sm-4">
              <label for="price1">Option 1 ($)</label>
              <input type="text" onChange={this.onChange} value={this.state.price1} className="myInput" name="price1"/>
              {this.state.errors.price1 && <span>{this.state.errors.price1}</span>}
            </div>
            <div className="col-sm-4">
              <label for="price2">Option 2 ($)</label>
              <input type="text" onChange={this.onChange} value={this.state.price2} className="myInput" name="price2"/>
              {this.state.errors.price2 && <span>{this.state.errors.price2}</span>}
            </div>
            <div className="col-sm-4">
              <label for="price3">Option 3 ($)</label>
              <input type="text" onChange={this.onChange} value={this.state.price3} className="myInput" name="price3"/>
              {this.state.errors.price3 && <span>{this.state.errors.price3}</span>}
            </div>
          </div>
          <button onClick={this.enteredPrices} type="button" class="btn btn-primary">Next</button>
        </form>
      </div>
    )

    // Form to enter MPG, resets every submit
    const MPGForm = (
    <div>
      <h1>Compare by MPG</h1>
      <h3>Keep Entering MPG Values and Compare!</h3>
      <form onSubmit={this.addOffer}>
        <div className="row">
          <div className="col-md-offset-3 col-sm-6 center-block">
            <label for="mpg">MPG, will compare for each price</label>
            <input type="text" onChange={this.onChange} value={this.state.mpg} className="myInput" name="mpg"/>
            {this.state.errors.mpg && <span>{this.state.errors.mpg}</span>}
          </div>
        </div>
        <button onClick={this.addOffer} type="button" class="btn btn-primary">Submit</button>
      </form>
    </div>
    )

    return (
      <div className="App">

        {/* Place to hold forms */}
        <div className="jumbotron">
          <div className="container">
            {this.state.form === 'initialInfoForm' && initalInfoForm}
            {this.state.form === 'carPricesForm' && carPricesForm}
            {this.state.form === 'MPGForm' && MPGForm}
          </div>
        </div>

        <div style={this.state.displayMessage}>
          <h2>Table will appear here</h2>
        </div>

        {/* Displays the table */}
        <div style={this.state.displayTable}>
          {/* Table key */}
          <div className="table-container">
            <div className="info"></div>
            <span>= Total Cost/Cost per Mile of the Car</span>
            <p>Calculated assuming you drive {this.state.milesDriven} miles over the life of the car at ${this.state.costPG} per gallon.</p>
          </div>

          {/* Table itself */}
          <table>
            <tbody>
              <tr>
                <td className="blank">Cost/MPG</td>
                {
                  // Map over prices, top row
                  this.state.prices.map((price, i) => {
                    return (<td>${price}</td>)
                  })
                }
              </tr>
              {
                // Map 
                this.state.mpgs.map((mpg, i) => {
                  return (
                    <tr>
                      <td>{mpg.value} mpg</td>
                      {
                        mpg.totals.map((total, i) => {
                          return (
                            <td className="total">${total.total}/${total.perMile.toFixed(2)}</td>
                          )
                        })
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    );
  }
}

export default App;
