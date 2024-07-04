import React, { useState } from "react";
import { TeamType, teamsAtom } from "@/store/teamsAtom";
import { selectedTeamAtom } from "@/store/selectedTeamAtom";
import { useAtom } from "jotai";
import { useFirebaseOperations } from "@/lib/firebase-operations";

const TeamSelector: React.FC = () => {
	const [selectedTeam, setSelectedTeam] = useAtom(selectedTeamAtom);
	const [teams] = useAtom(teamsAtom);
	const { readUserInfoFromTeam } = useFirebaseOperations();

	console.log(selectedTeam);

	const handleTeamClick = async (team: TeamType) => {
		if (team && team.teamId) {
			const data = await readUserInfoFromTeam(team);
			console.log("SELECTED TEAM DATA: ", data);

			setSelectedTeam(data);
		}
		console.log(team.teamId);
	};

	return (
		<div className="flex overflow-x-auto whitespace-nowrap p-4 bg-gray-100">
			{teams.map((team: TeamType) => (
				<div
					key={team.teamId}
					className={`inline-block mr-4 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
						selectedTeam && selectedTeam.teamId === team.teamId
							? "bg-blue-500 text-white"
							: "bg-gray-200"
					}`}
					onClick={() => handleTeamClick(team)}
				>
					{team.name}
				</div>
			))}
		</div>
	);
};

export default TeamSelector;
