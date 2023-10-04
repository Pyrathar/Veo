import React, { useEffect, useState } from "react";
import RenderNode from "./RenderNode";

interface NodeViewerProps {
  reloadNodes: boolean;
}

interface Node {
  id: number;
  name: string;
  height: number;
  parentId?: number;
  children?: Node[];
}

const NodeViewer: React.FC<NodeViewerProps> = ({ reloadNodes }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await fetch("http://localhost:8000/node/");
        const data = await response.json();
        setNodes(data);
      } catch (error) {
        console.error("Error fetching nodes:", error);
      }
    };

    fetchNodes();
  }, [reloadNodes]);
  if (error) {
    return <p>Error loading nodes: {error}</p>;
  }

  return (
    <div>
      {nodes.map((node) => (
        <RenderNode key={node.id} node={node} />
      ))}
    </div>
  );
};

export default NodeViewer;
