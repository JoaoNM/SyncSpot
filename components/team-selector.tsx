import React, { useState } from "react";
import { TeamType, teamsAtom } from "@/store/teamsAtom";
import { selectedTeamAtom } from "@/store/selectedTeamAtom";
import { useAtom } from "jotai";
import { useFirebaseOperations } from "@/lib/firebase-operations";

const TeamSelector: React.FC = () => {
	const [selectedTeam, setSelectedTeam] = useAtom(selectedTeamAtom);
	const [teams] = useAtom(teamsAtom);
	const { readUserInfoFromTeam } = useFirebaseOperations();

	const handleTeamClick = async (team: TeamType) => {
		if (team && team.teamId) {
			const data = await readUserInfoFromTeam(team);
			if (data !== null) setSelectedTeam(data)
		}
	};

	return (
		<div className="flex overflow-x-scroll max-w-[80vw] whitespace-nowrap py-2 md:py-4 ">
			{(teams || []).map((team: TeamType) => (
				<div
					key={team.teamId}
					className={`inline-block mr-4 pr-4 py-2 hover:opacity-70 rounded-lg cursor-pointer transition-opacity duration-200 ${
						selectedTeam && selectedTeam.teamId === team.teamId
							? "opacity-100 "
							: "opacity-50"
					}`}
					onClick={() => handleTeamClick(team)}
				>
					<span className="capitalize font-semibold text-lg">{team.name}</span>
				</div>
			))}
		</div>
	);
};

export default TeamSelector;
