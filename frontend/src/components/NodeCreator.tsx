import React, { useState } from "react";

interface FormData {
  name: string;
}

interface NodeCreatorProps {
  onNodeCreate: () => void;
}

const NodeCreator: React.FC<NodeCreatorProps> = ({ onNodeCreate }) => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ name: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  const toggleFormVisibility = () => setIsFormVisible(!isFormVisible);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/node/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create node");
      }

      // Handle success (maybe update state, or navigate user etc.)
      setIsFormVisible(false);
      setFormData({ name: "" });
      onNodeCreate();
    } catch (error) {
      // setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={toggleFormVisibility}>
        {isFormVisible ? "Cancel" : "Create Node"}
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <button type="submit" disabled={isLoading}>
            Submit
          </button>
        </form>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default NodeCreator;
