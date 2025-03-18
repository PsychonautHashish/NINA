import React, { useState, useEffect } from 'react';
import patientsData from '/src/client/data/patients.json';
import './AdminQueue.css';

function Queue() {
  const [queue, setQueue] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [priority, setPriority] = useState('medium');
  const [reason, setReason] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('timeAdded');

  useEffect(() => {
    const savedQueue = JSON.parse(localStorage.getItem('telemed-queue')) || [];
    setQueue(savedQueue);
  }, []);

  useEffect(() => {
    localStorage.setItem('telemed-queue', JSON.stringify(queue));
  }, [queue]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredPatients(query ? patientsData.filter(patient =>
      patient.name.toLowerCase().includes(query.toLowerCase())
    ) : []);
  };

  const addToQueue = () => {
    if (!selectedPatient || !reason) return;

    const newQueueItem = {
      id: Date.now(),
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      priority,
      reason,
      status: 'waiting',
      timeAdded: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    setQueue([...queue, newQueueItem]);
    setSelectedPatient(null);
    setSearchQuery('');
    setReason('');
    setPriority('medium');
  };

  const updateStatus = (id, newStatus) => {
    setQueue(queue.map(item => 
      item.id === id ? {
        ...item,
        status: newStatus,
        lastUpdated: new Date().toISOString()
      } : item
    ));
  };

  const removeFromQueue = (id) => {
    setQueue(queue.filter(item => item.id !== id));
  };

  const getQueueItems = (status) => {
    let filtered = queue.filter(item => item.status === status);
    if (filterPriority !== 'all') {
      filtered = filtered.filter(item => item.priority === filterPriority);
    }
    return filtered.sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(a.timeAdded) - new Date(b.timeAdded);
    });
  };

  const getWaitTime = (timeAdded) => {
    const diff = Math.floor((new Date() - new Date(timeAdded)) / 1000);
    const minutes = Math.floor(diff / 60);
    return `${minutes} min${minutes !== 1 ? 's' : ''}`;
  };

  return (
    <div className="queue-container">
      <div className="queue-header">
        <h1>Patient Queue</h1>
        <div className="controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {filteredPatients.length > 0 && (
              <div className="search-dropdown">
                {filteredPatients.map(patient => (
                  <div
                    key={patient.id}
                    className="dropdown-item"
                    onClick={() => {
                      setSelectedPatient(patient);
                      setFilteredPatients([]);
                      setSearchQuery(patient.name);
                    }}
                  >
                    {patient.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="queue-config">
            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="timeAdded">Sort by Time</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>
        </div>

        {selectedPatient && (
          <div className="add-to-queue-form">
            <h3>Add {selectedPatient.name} to Queue</h3>
            <div className="form-group">
              <label>Priority:</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="form-group">
              <label>Reason:</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter visit reason..."
              />
            </div>
            <button onClick={addToQueue} className="add-button">
              Add to Queue
            </button>
          </div>
        )}
      </div>

      <div className="queue-stats">
        <div className="stat-card">
          <h3>Total in Queue</h3>
          <p>{queue.length}</p>
        </div>
        <div className="stat-card">
          <h3>Average Wait</h3>
          <p>{queue.length ? `${Math.floor(queue.length * 2.5)} mins` : 'N/A'}</p>
        </div>
        <div className="stat-card">
          <h3>High Priority</h3>
          <p>{queue.filter(item => item.priority === 'high').length}</p>
        </div>
      </div>

      <div className="queue-columns">
        <div className="queue-column">
          <h2>Waiting ({getQueueItems('waiting').length})</h2>
          {getQueueItems('waiting').map(item => (
            <div key={item.id} className={`queue-item priority-${item.priority}`}>
              <div className="item-header">
                <span className="priority-tag">{item.priority}</span>
                <span className="wait-time">{getWaitTime(item.timeAdded)}</span>
              </div>
              <h3>{item.patientName}</h3>
              <p>{item.reason}</p>
              <div className="item-actions">
                <button onClick={() => updateStatus(item.id, 'in-consultation')}>
                  Start Consultation
                </button>
                <button onClick={() => removeFromQueue(item.id)} className="remove">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="queue-column">
          <h2>In Consultation ({getQueueItems('in-consultation').length})</h2>
          {getQueueItems('in-consultation').map(item => (
            <div key={item.id} className="queue-item in-consultation">
              <div className="item-header">
                <span className="priority-tag">{item.priority}</span>
                <span className="wait-time">{getWaitTime(item.timeAdded)}</span>
              </div>
              <h3>{item.patientName}</h3>
              <p>{item.reason}</p>
              <div className="item-actions">
                <button onClick={() => updateStatus(item.id, 'completed')}>
                  Mark Complete
                </button>
                <button onClick={() => updateStatus(item.id, 'waiting')}>
                  Return to Queue
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="queue-column">
          <h2>Completed ({getQueueItems('completed').length})</h2>
          {getQueueItems('completed').map(item => (
            <div key={item.id} className="queue-item completed">
              <h3>{item.patientName}</h3>
              <p>{item.reason}</p>
              <div className="item-actions">
                <span>Completed in {getWaitTime(item.lastUpdated)}</span>
                <button onClick={() => removeFromQueue(item.id)} className="remove">
                  Clear
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Queue;