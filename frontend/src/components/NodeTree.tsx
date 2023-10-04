import React from "react";

export interface Node {
  id: number;
  name: string;
  height: number;
  parentId?: number;
  children?: Node[];
}

interface NodeTreeProps {
  nodes: Node[];
  onSelectNode: (id: number) => void;
}

export const NodeTree: React.FC<NodeTreeProps> = ({ nodes, onSelectNode }) => {
  return (
    <ul>
      {nodes.map((node) => (
        <li key={node.id}>
          <span onClick={() => onSelectNode(node.id)}>{node.name}</span>
          {node.children && node.children.length > 0 && (
            <NodeTree nodes={node.children} onSelectNode={onSelectNode} />
          )}
        </li>
      ))}
    </ul>
  );
};
