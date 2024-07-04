import React from "react";
import moment from "moment-timezone";

const TimezoneSelect = ({ value, onChange }) => {
	const timezones = moment.tz.names();

	return (
		<select value={value} onChange={onChange}>
			{timezones.map((timezone) => (
				<option key={timezone} value={timezone}>
					{timezone}
				</option>
			))}
		</select>
	);
};

export default TimezoneSelect;
