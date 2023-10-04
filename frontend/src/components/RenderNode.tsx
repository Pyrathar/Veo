import React from "react";

interface Node {
  id: number;
  name: string;
  height: number;
  parentId?: number;
  children?: Node[];
}

interface RenderNodeProps {
  node: Node;
}

const RenderNode: React.FC<RenderNodeProps> = ({ node }) => {
  return (
    <div style={{ marginLeft: node.height * 20 }}>
      <p>{node.name}</p>
      {node.children &&
        node.children.map((child) => (
          <RenderNode key={child.id} node={child} />
        ))}
    </div>
  );
};

export default RenderNode;
