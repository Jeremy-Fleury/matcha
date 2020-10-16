/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UserProfilePage.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/20 09:34:28 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { ProfileCardsScroll } from "../../component/ProfileCardsScroll";
import { handleGeoLocationAPI } from "../../services/apiCalls";
import { connect, ConnectedProps } from "react-redux";
import {
	actionUser_geolocation,
	actionUser_setProfile,
} from "../../store/user/action";
import { actionUi_showSnackbar } from "../../store/ui/action";
import { BaseProfileFormContent } from "../profile/BaseProfileFormContent";
import { ProfileOptional1 } from "../profile/ProfileOptional1";
import { ProfileOptional2 } from "../profile/ProfileOptional2";
import { ProfileOptional3 } from "../profile/ProfileOptional3";
import { IbaseProfile, IextendedProfile } from "../../types/types";
import {
	getProfileHydrateRedux,
	submitPictures,
	submitTags,
	submitUsageLocation,
	updateProfile,
} from "../../services/profileUtils";
import { useGeolocation } from "../../services/useGeolocation";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	profile: state.user.profile,
	tagList: state.user.tagList,
	usagelocation: state.user.usagelocation,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const UserProfilePageComponent = (props: Props) => {
	const [profile, setProfile] = useState<any>();
	const [disabled, setDisabled] = useState(false);
	const [imgs, setImgs] = useState<(string | null)[]>([
		null,
		null,
		null,
		null,
		null,
	]);

	const geolocation = useGeolocation();

	useEffect(() => {
		if (geolocation) {
			props.dispatch(
				actionUser_geolocation({
					geolocation: geolocation,
				})
			);
			handleGeoLocationAPI(geolocation, props.loggedIn).catch((error) => {
				props.dispatch(
					actionUi_showSnackbar({
						message: error.message,
						type: "error",
					})
				);
				console.log(error.message);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [geolocation]);

	useEffect(() => {
		getProfileHydrateRedux(props.dispatch, props.loggedIn);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfile({ ...profile, [name]: value });
	};

	const setProfileBase = (profile: IextendedProfile | IbaseProfile) => {
		props.dispatch(actionUser_setProfile({ profile: profile }));
	};

	const handleSubmit = async () => {
		await Promise.all([
			updateProfile(props.profile, props.loggedIn, props.dispatch),
			submitTags(props.tagList, props.loggedIn, props.dispatch),
			submitPictures(imgs, props.loggedIn, props.dispatch),
			submitUsageLocation(props.usagelocation, props.loggedIn, props.dispatch),
		]);
	};

	return (
		<Grid item container direction="row" style={{ height: "100%" }}>
			<Grid
				container
				item
				xs={12}
				sm={9}
				style={{ height: "100%" }}
				alignContent="flex-start"
				justify="center"
			>
				<Grid item container justify="center" xs={6}>
					<Grid item xs={12} lg={8}>
						<ProfileOptional2
							handleChange={handleChangeProfile}
							setDisabled={setDisabled}
							imgs={imgs}
							setImgs={setImgs}
						/>
					</Grid>
					<Grid item xs={12} lg={8}>
						<BaseProfileFormContent
							profile={props.profile}
							setProfile={setProfileBase}
						/>
					</Grid>
					<Grid item xs={12} lg={8}>
						<ProfileOptional1
							handleChange={handleChangeProfile}
							setDisabled={setDisabled}
						/>
					</Grid>
					<Grid item xs={12} lg={8}>
						<ProfileOptional3
							handleChange={handleChangeProfile}
							setDisabled={setDisabled}
						/>
					</Grid>
					<Grid item xs={12} lg={8}>
						<Button
							variant="contained"
							color="primary"
							onClick={handleSubmit}
							fullWidth
							disabled={disabled}
						>
							Update Profile
						</Button>
					</Grid>
				</Grid>
			</Grid>

			<Grid
				container
				item
				xs={12}
				sm={3}
				style={{ height: "100%" }}
				spacing={3}
			>
				<Grid item xs={12} style={{ height: "50%" }}>
					<ProfileCardsScroll />
				</Grid>
				<Grid item xs={12} style={{ height: "50%" }}>
					<ProfileCardsScroll />
				</Grid>
			</Grid>
		</Grid>
	);
};

export const UserProfilePage = withReduxProps(UserProfilePageComponent);
