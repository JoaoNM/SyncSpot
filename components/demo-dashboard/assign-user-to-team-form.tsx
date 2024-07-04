// components/AssignUserToTeamForm.tsx
"use client";

import { useState } from "react";
import { useFirebaseOperations } from "@/lib/firebase-operations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const AssignUserToTeamForm = () => {
  const [userId, setUserId] = useState("");
  const [teamId, setTeamId] = useState("");

  const { assignUserToTeam } = useFirebaseOperations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    assignUserToTeam(userId, teamId);
    setUserId("");
    setTeamId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User ID:</label>
        <Input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <label>Team ID:</label>
        <Input
          type="text"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
        />
      </div>
      <Button type="submit">Assign User to Team</Button>
    </form>
  );
};

export default AssignUserToTeamForm;
