import React, { useState } from "react";
import { TeamType } from "@/store/teamsAtom";
import { selectedTeamAtom } from "@/store/selectedTeamAtom";
import { useAtom } from "jotai";

interface TeamSelectorProps {
	teams: TeamType[];
	setSelectedTeam: (team: TeamType) => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({
	teams,
	setSelectedTeam,
}) => {
	const [activeTeam, setActiveTeam] = useState<string | null>(null);

	const handleTeamClick = (team: TeamType) => {
		setActiveTeam(team.name);
		setSelectedTeam(team);
	};

	return (
		<div className="flex overflow-x-auto whitespace-nowrap p-4 bg-gray-100">
			{teams.map((team) => (
				<div
					key={team.name}
					className={`inline-block mr-4 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
						activeTeam === team.name ? "bg-blue-500 text-white" : "bg-gray-200"
					}`}
					onClick={() => handleTeamClick(team)}
				>
					{JSON.stringify(team)}
				</div>
			))}
		</div>
	);
};

export default TeamSelector;
