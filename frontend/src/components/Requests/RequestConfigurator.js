// RequestConfigurator.js
const RequestConfigurator = ({ endpoint }) => {
    const [headers, setHeaders] = useState([]);
    const [body, setBody] = useState('');
  
    const addHeader = () => {
      setHeaders([...headers, { key: '', value: '' }]);
    };
  
    const updateHeader = (index, key, value) => {
      const newHeaders = headers.map((header, i) =>
        i === index ? { ...header, [key]: value } : header
      );
      setHeaders(newHeaders);
    };
  
    const handleSendRequest = async () => {
      const response = await fetch(endpoint.url, {
        method: endpoint.method,
        headers: headers.reduce((acc, header) => ({ ...acc, [header.key]: header.value }), {}),
        body: endpoint.method !== 'GET' ? body : null,
      });
      const data = await response.json();
      console.log('Response:', data);
    };
  
    return (
      <div>
        <h2>Configure Request for {endpoint.name}</h2>
        <div>
          {headers.map((header, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Header Key"
                value={header.key}
                onChange={(e) => updateHeader(index, 'key', e.target.value)}
              />
              <input
                type="text"
                placeholder="Header Value"
                value={header.value}
                onChange={(e) => updateHeader(index, 'value', e.target.value)}
              />
            </div>
          ))}
          <button onClick={addHeader}>Add Header</button>
        </div>
        <div>
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={endpoint.method === 'GET'}
          />
        </div>
        <button onClick={handleSendRequest}>Send Request</button>
      </div>
    );
  };
  