import React, { useState, useCallback } from 'react';
import NodeCreator from './components/NodeCreator';
import NodeViewer from './components/NodeViewer';

const App: React.FC = () => {
  const [reloadNodes, setReloadNodes] = useState(false);

  const onNodeCreate = useCallback(() => {
    // Toggle reloadNodes each time a node is created
    setReloadNodes(!reloadNodes);
  }, [reloadNodes]);

  return (
    <div className="App">
      <h1>My Node App</h1>
      <NodeCreator onNodeCreate={onNodeCreate} />
      <NodeViewer reloadNodes={reloadNodes} />
    </div>
  );
};

export default App;