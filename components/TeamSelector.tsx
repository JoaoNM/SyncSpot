import React, { useState } from "react";
import { TeamType, teamsAtom } from "@/store/teamsAtom";
import { selectedTeamAtom } from "@/store/selectedTeamAtom";
import { useAtom } from "jotai";

interface TeamSelectorProps {
	teams: TeamType[];
	setSelectedTeam: (team: TeamType) => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = () => {
	const [selectedTeam, setSelectedTeam] = useAtom(selectedTeamAtom);
	const [teams] = useAtom(teamsAtom);
	const [activeTeam, setActiveTeam] = useState<string | null>(null);

	console.log(selectedTeam);

	const handleTeamClick = (team: TeamType) => {
		console.log(team.teamId);
		setSelectedTeam(team);
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
