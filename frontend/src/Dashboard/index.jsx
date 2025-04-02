import React, { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
    const [errorLogs, setErrorLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
          try {
            const response = await api.get("/api/errors/latest");
            const { originalError, analysis } = response.data;
            const logLines = [
              JSON.stringify(originalError, null, 2),
              JSON.stringify(analysis, null, 2)
            ];
            setErrorLogs(logLines);
          } catch (error) {
            console.error("Error fetching logs:", error.response?.data || error.message);
            setErrorLogs(["Failed to load logs. Error: " + (error.response?.data?.message || error.message)]);
          } finally {
            setLoading(false);
          }
        };
    
        fetchLogs();

        // Add polling for real-time updates
        const pollInterval = setInterval(fetchLogs, 5000);
        return () => clearInterval(pollInterval);
      }, []);

    return (
        <div className="dashboard">
            <h1>Error Logs Dashboard</h1>
            {loading ? (
                <p>Loading logs...</p>
            ) : (
                <div className="logs-container">
                    {errorLogs.length > 0 ? (
                        <ul>
                            {errorLogs.map((log, index) => (
                                <li key={index} style={{ 
                                    whiteSpace: 'pre-wrap',
                                    padding: '10px',
                                    margin: '5px 0',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '4px'
                                }}>
                                    {log}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No error logs found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;