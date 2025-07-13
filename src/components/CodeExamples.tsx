
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, ExternalLink, Code, Database, Globe, FileText } from 'lucide-react';

const CodeExamples = () => {
  const [copiedCode, setCopiedCode] = useState('');

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const unitTestExamples = [
    {
      id: 'react-component',
      title: 'React Component Test',
      file: 'UserCard.test.js',
      description: 'Testing component rendering and user interactions',
      code: `import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserCard from '../components/UserCard';

describe('UserCard Component', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar.jpg'
  };

  test('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockUser.avatar);
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<UserCard user={mockUser} onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledWith(mockUser.id);
  });

  test('displays placeholder when no avatar provided', () => {
    const userWithoutAvatar = { ...mockUser, avatar: null };
    render(<UserCard user={userWithoutAvatar} />);
    
    expect(screen.getByText('JD')).toBeInTheDocument(); // Initials
  });
});`
    },
    {
      id: 'custom-hook',
      title: 'Custom Hook Test',
      file: 'useAuth.test.js',
      description: 'Testing custom React hooks with proper setup',
      code: `import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../hooks/useAuth';
import { AuthProvider } from '../contexts/AuthContext';

const wrapper = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('useAuth Hook', () => {
  test('initializes with no user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
  });

  test('login updates user state', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    expect(result.current.user).toBeTruthy();
    expect(result.current.isAuthenticated).toBe(true);
  });

  test('logout clears user state', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    // First login
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    // Then logout
    await act(async () => {
      await result.current.logout();
    });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});`
    },
    {
      id: 'utility-function',
      title: 'Utility Function Test',
      file: 'utils.test.js',
      description: 'Testing pure functions and utility helpers',
      code: `import { 
  formatDate, 
  validateEmail, 
  calculateAge, 
  debounce 
} from '../utils/helpers';

describe('Utility Functions', () => {
  describe('formatDate', () => {
    test('formats date correctly', () => {
      const date = new Date('2023-12-25');
      expect(formatDate(date)).toBe('December 25, 2023');
    });

    test('handles invalid date', () => {
      expect(formatDate('invalid')).toBe('Invalid Date');
    });
  });

  describe('validateEmail', () => {
    test('validates correct email format', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
    });

    test('rejects invalid email format', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();
    
    test('delays function execution', () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 100);
      
      debouncedFunc();
      expect(func).not.toHaveBeenCalled();
      
      jest.advanceTimersByTime(100);
      expect(func).toHaveBeenCalledTimes(1);
    });
  });
});`
    }
  ];

  const integrationTestExamples = [
    {
      id: 'api-endpoint',
      title: 'API Endpoint Test',
      file: 'auth.test.js',
      description: 'Testing Express API endpoints with Supertest',
      code: `const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const { setupTestDB, clearTestDB } = require('../config/testDb');

describe('Authentication API', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await clearTestDB();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    test('registers new user successfully', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.data.token).toBeDefined();
    });

    test('rejects duplicate email registration', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      // First registration
      await request(app)
        .post('/api/auth/register')
        .send(userData);

      // Duplicate registration
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword123'
      });
    });

    test('authenticates user with correct credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'password123'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
    });
  });
});`
    },
    {
      id: 'database-ops',
      title: 'Database Operations',
      file: 'user.model.test.js',
      description: 'Testing database models and operations',
      code: `const mongoose = require('mongoose');
const User = require('../models/User');
const { setupTestDB, clearTestDB } = require('../config/testDb');

describe('User Model', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await clearTestDB();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test('creates user with valid data', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.createdAt).toBeDefined();
  });

  test('validates required fields', async () => {
    const user = new User({});

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
    expect(error.errors.email).toBeDefined();
  });

  test('hashes password before saving', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'plainPassword'
    });

    await user.save();
    expect(user.password).not.toBe('plainPassword');
    expect(user.password.length).toBeGreaterThan(20);
  });

  test('finds user by email', async () => {
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });

    const foundUser = await User.findByEmail('john@example.com');
    expect(foundUser).toBeTruthy();
    expect(foundUser.name).toBe('John Doe');
  });
});`
    }
  ];

  const e2eTestExamples = [
    {
      id: 'cypress-login',
      title: 'Cypress Login Flow',
      file: 'login.cy.js',
      description: 'End-to-end testing with Cypress',
      code: `describe('User Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('displays login form correctly', () => {
    cy.get('[data-testid="login-form"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain.text', 'Login');
  });

  it('shows validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    
    cy.get('[data-testid="email-error"]')
      .should('be.visible')
      .and('contain.text', 'Email is required');
    
    cy.get('[data-testid="password-error"]')
      .should('be.visible')
      .and('contain.text', 'Password is required');
  });

  it('successfully logs in with valid credentials', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Should redirect to dashboard
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="user-menu"]').should('be.visible');
    cy.get('[data-testid="welcome-message"]')
      .should('contain.text', 'Welcome back');
  });

  it('handles invalid credentials gracefully', () => {
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
    
    // Should remain on login page
    cy.url().should('include', '/login');
  });

  it('provides "forgot password" functionality', () => {
    cy.get('[data-testid="forgot-password-link"]').click();
    cy.url().should('include', '/forgot-password');
    
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('button[type="submit"]').click();
    
    cy.get('[data-testid="success-message"]')
      .should('contain.text', 'Reset link sent');
  });
});`
    },
    {
      id: 'playwright-e2e',
      title: 'Playwright E2E Test',
      file: 'user-journey.spec.js',
      description: 'Complete user journey testing with Playwright',
      code: `const { test, expect } = require('@playwright/test');

test.describe('Complete User Journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('user can register, login, and perform CRUD operations', async ({ page }) => {
    // Registration
    await page.click('[data-testid="register-link"]');
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Verify registration success
    await expect(page.locator('[data-testid="success-message"]'))
      .toContainText('Registration successful');

    // Login
    await page.click('[data-testid="login-link"]');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Verify dashboard access
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('[data-testid="user-name"]'))
      .toContainText('John Doe');

    // Create a new post
    await page.click('[data-testid="create-post-btn"]');
    await page.fill('input[name="title"]', 'My First Post');
    await page.fill('textarea[name="content"]', 'This is my first post content');
    await page.click('button[type="submit"]');

    // Verify post creation
    await expect(page.locator('[data-testid="post-title"]'))
      .toContainText('My First Post');

    // Edit the post
    await page.click('[data-testid="edit-post-btn"]');
    await page.fill('input[name="title"]', 'My Updated Post');
    await page.click('button[type="submit"]');

    // Verify post update
    await expect(page.locator('[data-testid="post-title"]'))
      .toContainText('My Updated Post');

    // Delete the post
    await page.click('[data-testid="delete-post-btn"]');
    await page.click('[data-testid="confirm-delete"]');

    // Verify post deletion
    await expect(page.locator('[data-testid="no-posts-message"]'))
      .toBeVisible();

    // Logout
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="logout-btn"]');

    // Verify logout
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-testid="login-link"]'))
      .toBeVisible();
  });
});`
    }
  ];

  const debugExamples = [
    {
      id: 'error-boundary',
      title: 'React Error Boundary',
      file: 'ErrorBoundary.jsx',
      description: 'Comprehensive error handling for React components',
      code: `import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to monitoring service
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error, errorInfo) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Send to error monitoring service
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData)
    }).catch(err => console.error('Failed to log error:', err));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong!</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Error Details</summary>
            <p>{this.state.error && this.state.error.toString()}</p>
            <p>{this.state.errorInfo.componentStack}</p>
          </details>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;`
    },
    {
      id: 'express-error-handler',
      title: 'Express Global Error Handler',
      file: 'errorHandler.js',
      description: 'Centralized error handling for Express applications',
      code: `const logger = require('./logger');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const handleCastErrorDB = (err) => {
  const message = \`Invalid \${err.path}: \${err.value}\`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\\\?.)*?\\1/)[0];
  const message = \`Duplicate field value: \${value}. Please use another value!\`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = \`Invalid input data. \${errors.join('. ')}\`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, req, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
  
  // Programming or other unknown error: don't leak error details
  logger.error('ERROR 💥', err);
  
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!'
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendErrorProd(error, req, res);
  }
};

module.exports.AppError = AppError;`
    }
  ];

  const testCategories = [
    { id: 'unit', title: 'Unit Tests', icon: Code, examples: unitTestExamples },
    { id: 'integration', title: 'Integration Tests', icon: Database, examples: integrationTestExamples },
    { id: 'e2e', title: 'E2E Tests', icon: Globe, examples: e2eTestExamples },
    { id: 'debug', title: 'Debug Tools', icon: FileText, examples: debugExamples }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-600" />
            Testing Code Examples
          </CardTitle>
          <CardDescription>
            Production-ready testing patterns and debugging techniques for MERN applications
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="unit" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/50 backdrop-blur-sm">
          {testCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              <category.icon className="w-4 h-4" />
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {testCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            {category.examples.map((example) => (
              <Card key={example.id} className="border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {example.title}
                        <Badge variant="secondary" className="text-xs">
                          {example.file}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{example.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(example.code, example.id)}
                      >
                        {copiedCode === example.id ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeExamples;
