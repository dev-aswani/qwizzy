import React from "react";
import "../css/EmptyState.css";
import { Icon } from "@mui/material";
function EmptyState({ textTitle, textBody, Icon }) {
	return (
		<div className="empty-state-container">
			<div className="empty-state-icon">
				<Icon style={{ fontSize: "200px" }}></Icon>
			</div>
			<div className="empty-state-text">
				<div className="empty-state-title">{textTitle}</div>
				<div className="empty-state-body">
					<div className="textBody">{textBody}</div>
				</div>
			</div>
		</div>
	);
}

export default EmptyState;
