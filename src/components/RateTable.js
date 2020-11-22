import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import '../App.css';

export default class RateTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rates: {}
    };
  }
  
  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest?base=IDR")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            rates: result.rates
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  
  makeCurrency = (curc, value) => {
    if (value === 0) {
      curc = (curc * 141) / 100;
      } else if (value === 1) {
           curc = (curc * 140) / 100;
      } else {
      
    }
    var fixedCurc = curc.toFixed(4).toString();
      while (fixedCurc.length < 8) {
        fixedCurc = "0" + fixedCurc;
    }
  
    return fixedCurc;
  };
  
  createTable = () => {
    const rates = this.state;
      let ratesCurc = Object.keys(rates).map(i => rates[i])[2];
      let table = [];
      let children = [];
      let showCurc = ["CAD", "IDR", "JPY", "CHF", "EUR", "USD"];
  
    for (var key in ratesCurc) {
      if (ratesCurc.hasOwnProperty(key) && showCurc.includes(key)) {
        children.push(
          <tr>
            <td>{key}</td>
            <td>{this.makeCurrency(ratesCurc[key], 0)}</td>
            <td>{this.makeCurrency(ratesCurc[key])}</td>
            <td>{this.makeCurrency(ratesCurc[key], 1)}</td>
          </tr>
        );
      }
    }
    table.push(<tbody>{children}</tbody>);
  
    return table;
  };

  
  render() {

  return (
    <div className="App">
      <Table className="BasicTable">
        <TableHead>
          <TableRow>
            <TableCell >&nbsp;</TableCell>
            <TableCell component="th" align="right">WE BUY</TableCell>
            <TableCell component="th" align="right">EXCHANGE RATE</TableCell>
            <TableCell component="th" align="right">WE SELL</TableCell>
          </TableRow>
        </TableHead>
        {this.createTable()}
        <TableBody>
        
        </TableBody>
      </Table>
        <p> * base currency is IDR 
            <br />* As for the API,&nbsp;
              <a href="https://exchangeratesapi.io/">
                https://exchangeratesapi.io/
              </a>
              &nbsp;is used.
        </p>
   </div>
  );
          }
}