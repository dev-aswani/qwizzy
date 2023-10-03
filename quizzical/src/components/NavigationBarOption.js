import React from "react";
import { Icon } from "@mui/material";
import "../css/NavigationBarOption.css";
function NavigationBarOption({ Icon, title }) {
	return (
		<div className="navigationBarOption">
			<Icon className="navigationBarOptionIcon"></Icon>
			<h3 className="navigationBarOptionTitle">{title}</h3>
		</div>
	);
}

export default NavigationBarOption;
