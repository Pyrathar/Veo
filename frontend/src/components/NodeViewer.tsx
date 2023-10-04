import React, { useEffect, useState } from 'react';
import RenderNode from './RenderNode';

interface Node {
  id: number;
  name: string;
  height: number;
  parentId?: number;
  children?: Node[];
}

const NodeViewer: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/node/') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setNodes(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setError(error.toString());
      });
  }, []);

  if (error) {
    return <p>Error loading nodes: {error}</p>;
  }

  return (
    <div>
      {nodes.map(node => (
        <RenderNode key={node.id} node={node} />
      ))}
    </div>
  );
}

export default NodeViewer;
