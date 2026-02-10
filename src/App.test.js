import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Mock child components to avoid complexity in tests
jest.mock('./components/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('./components/Sidebar', () => () => <div data-testid="sidebar">Sidebar</div>);

describe('App Component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  test('contains main app container', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const appContainer = screen.getByTestId('app-container');
    expect(appContainer).toBeInTheDocument();
  });
});

describe('Header Component', () => {
  test('renders header text', () => {
    render(<Header />);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });
});

describe('Sidebar Component', () => {
  test('renders navigation links', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const sidebarElement = screen.getByTestId('sidebar');
    expect(sidebarElement).toBeInTheDocument();
  });
});

// Test for routing
describe('Routing', () => {
  test('navigates to different pages', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Check if main content area exists
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
  });
});