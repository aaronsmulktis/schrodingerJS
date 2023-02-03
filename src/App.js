
import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Plotly from 'plotly.js/dist/plotly-cartesian';

function App() {

  function d2psi(psi, x, h) {
    let c = x + h;

    return (psi(c) - 2 * psi(x) + psi(x - h)) / (h * h);
  }

  function schrodinger(psi, t, V, hbar, m) {
    let newPsi = x => psi(x)
    return -(hbar * hbar / (2 * m)) * d2psi(newPsi, 3, hbar) + V(m) * psi;
  }
  
  // Use numerical methods such as finite differences to approximate the solution
  // to the Schrödinger equation for a given potential energy function V(x) and initial wave function psi(x)
  function solveSchrodinger(psi0, t, V, hbar, m, xmin, xmax, n) {
    let h = (xmax - xmin) / n;
    let x = xmin;
    let psi = (s) => psi0(s);
    let solution = [];
    for (let i = 0; i < n; i++) {
      solution.push(psi(x));
      schrodinger(psi, t, V, hbar, m);
      x += h;
    }
    return solution;
  }

  let psi0 = x => Math.exp(-x * x / 2); // Gaussian wave packet
  let V = x => 0; // Free particle
  let hbar = 1.0545718e-34;
  let M = 9.10938356e-31;

  let solution = solveSchrodinger(psi0, 0, V, hbar, M, 0.01, 10, 111);
  
  useEffect(() => {
    console.log(solution)
    Plotly.newPlot("plotGraph", [{
      y: solution,
      type: 'line'
    }]);
  }, [solution]);

  return (
    <div className="App">
      <div id="plotGraph" />
    </div>
  );
}

export default App;
