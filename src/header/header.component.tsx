import * as React from 'react';
import './header.css';

export function HeaderComponent() {
  return (
    <header className="bg-primary text-white">
      <div className="container text-center">
        <h1>WC-Tracker</h1>
        <p className="lead">Don't waste time in the line</p>
      </div>
  </header>
  );
}
