/**
 *
 * HealthCheck
 *
 */

import React from 'react';

const HealthCheck = () => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'ecommerce-client',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  };

  return (
    <div style={{ 
      fontFamily: 'monospace', 
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#28a745' }}>✓ Service Health Check</h1>
      <pre style={{ 
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '5px',
        border: '1px solid #ddd'
      }}>
        {JSON.stringify(healthData, null, 2)}
      </pre>
    </div>
  );
};

export default HealthCheck;
