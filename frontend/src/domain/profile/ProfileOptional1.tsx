/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileOptional1.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/06 17:50:00 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/06 13:04:55 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState, useEffect } from "react";

import { Grid, Icon, Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import { Iprofile } from "../../types/types";

type Props = {
	setProfile: React.Dispatch<React.SetStateAction<Iprofile>>;
	setDisabled?: (value: React.SetStateAction<boolean>) => void;
	profile: Iprofile;
};

export function ProfileOptional1(props: Props) {
	const [orientationFieldInactive, setOrientationFieldInactive] = useState(
		true
	);
	const [localSexualOrientation, setLocalSexualOrientation] = useState(
		findReverseOrientation()
	);

	function findOrientation(orientation: string, gender = props.profile.gender) {
		if (gender === "male") {
			switch (orientation) {
				case "male":
					return "gay";
				case "female":
					return "heterosexual";
				case "bisexual":
					return "bisexual";
				default:
					throw new Error("wrong value in orientation field: " + orientation);
			}
		}
		if (gender === "female") {
			switch (orientation) {
				case "female":
					return "lesbian";
				case "male":
					return "heterosexual";
				case "bisexual":
					return "bisexual";
				default:
					throw new Error("wrong value in orientation field: " + orientation);
			}
		}
		return "bisexual";
	}

	function findReverseOrientation() {
		if (props.profile.sexualOrientation === "gay") {
			return "male";
		}
		if (props.profile.sexualOrientation === "lesbian") {
			return "female";
		}
		if (props.profile.sexualOrientation === "heterosexual") {
			switch (props.profile.gender) {
				case "male":
					return "female";
				case "female":
					return "male";
			}
		}
		return "bisexual";
	}

	useEffect(() => {
		if (props.profile.gender !== null) {
			setOrientationFieldInactive(false);
		}
		if (props.setDisabled) {
			if (props.profile.gender && props.profile.sexualOrientation) {
				props.setDisabled(false);
			} else {
				props.setDisabled(true);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.profile]);

	function handleChangeGender(
		e: React.MouseEvent<HTMLElement>,
		nextView: string
	) {
		if (nextView !== null) {
			const tmpProfile = { ...props.profile };
			tmpProfile.gender = nextView;
			tmpProfile.sexualOrientation = findOrientation(
				localSexualOrientation,
				nextView
			);
			props.setProfile(tmpProfile);
		}
	}

	function handleChangeSexualOrientation(
		e: React.MouseEvent<HTMLElement>,
		nextView: string
	) {
		if (nextView !== null) {
			const tmpProfile = { ...props.profile };
			tmpProfile.sexualOrientation = findOrientation(nextView);
			props.setProfile(tmpProfile);
			setLocalSexualOrientation(nextView);
		}
	}

	return (
		<React.Fragment>
			<Grid
				item
				container
				xs={12}
				justify="center"
				alignContent="center"
				alignItems="center"
				direction="column"
			>
				<Grid item xs={6}>
					<Typography color="primary">I am a</Typography>
					<ToggleButtonGroup
						onChange={handleChangeGender}
						exclusive
						value={props.profile.gender || ""}
					>
						<ToggleButton value="male">
							<Icon className="fa fa-mars" />
						</ToggleButton>
						<ToggleButton value="female">
							<Icon className="fa fa-venus" />
						</ToggleButton>
					</ToggleButtonGroup>
				</Grid>
				<Grid item xs={6}>
					<Typography color="primary">Looking for</Typography>
					<ToggleButtonGroup
						onChange={handleChangeSexualOrientation}
						exclusive
						value={localSexualOrientation || ""}
					>
						<ToggleButton value="male" disabled={orientationFieldInactive}>
							<Icon className="fa fa-mars" />
						</ToggleButton>
						<ToggleButton value="female" disabled={orientationFieldInactive}>
							<Icon className="fa fa-venus" />
						</ToggleButton>
						<ToggleButton value="bisexual" disabled={orientationFieldInactive}>
							<Icon className="fa fa-venus-mars" />
						</ToggleButton>
					</ToggleButtonGroup>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
