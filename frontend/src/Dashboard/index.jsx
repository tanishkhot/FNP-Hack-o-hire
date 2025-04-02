import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [errorLogs, setErrorLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
          try {
            const response = await axios.get("/api/errors/latest");
            const { originalError, analysis } = response.data;
            const logLines = [
              JSON.stringify(originalError, null, 2),
              JSON.stringify(analysis, null, 2)
            ];
            setErrorLogs(logLines);
          } catch (error) {
            console.error("Error fetching logs:", error);
            setErrorLogs(["Failed to load logs."]);
          } finally {
            setLoading(false);
          }
        };
    
        fetchLogs();
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
                                <li key={index}>{log}</li>
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