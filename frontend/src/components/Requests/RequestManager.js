// EndpointsManager.js
import React, { useState } from 'react';

const RequestManager = () => {
  const [endpoints, setEndpoints] = useState([]);
  const [newEndpoint, setNewEndpoint] = useState({ name: '', url: '', method: 'GET' });

  const addEndpoint = () => {
    setEndpoints([...endpoints, newEndpoint]);
    setNewEndpoint({ name: '', url: '', method: 'GET' });
  };

  return (
    <div>
      <h2>Manage Endpoint Requests</h2>
      <div>
      <select
          value={newEndpoint.category}
            onChange={(e) => setNewEndpoint({ ...newEndpoint, method: e.target.value })}
          >
            <option value="Analysis">Analysis</option>
            <option value="Catalog">Catalog</option>
            <option value="StoreDirectory">Store Directory</option>
            <option value="FileProcessing">File Processing</option>
            <option value="SAP Query">SAP Query</option>
            <option value="Shipping">Shipping</option>
            <option value="StoreOrders">Store Orders</option>                        
            <option value="Reports">Reports</option>
        </select>
        <input
          type="text"
          placeholder="Request Name"
          value={newEndpoint.name}
          onChange={(e) => setNewEndpoint({ ...newEndpoint, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL"
          value={newEndpoint.url}
          onChange={(e) => setNewEndpoint({ ...newEndpoint, url: e.target.value })}
        />
        <select
          value={newEndpoint.method}
          onChange={(e) => setNewEndpoint({ ...newEndpoint, method: e.target.value })}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <button onClick={addEndpoint}>Add Endpoint</button>
      </div>
      <ul>
        {endpoints.map((endpoint, index) => (
          <li key={index}>
            {endpoint.name} - {endpoint.method} - {endpoint.url}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestManager;
