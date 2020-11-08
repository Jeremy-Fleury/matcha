/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MainPage.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/08 20:10:02 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { Pagination } from "@material-ui/lab";
import {
	Drawer,
	makeStyles,
	Grid,
	Slider,
	CircularProgress,
	Typography,
	Button,
} from "@material-ui/core";
import { ProfileCard } from "../../component/ProfileCard";
import { KeyboardArrowRight } from "@material-ui/icons";
import { ToggleGroup } from "../../component/ToggleGroup";
import { connect, ConnectedProps } from "react-redux";
import {
	getSearchList,
	getRecommendationList,
	isProfileComplete,
	getAge,
} from "../../services/profileUtils";
import { MaterialDoubleSlider } from "../../component/MaterialDoubleSlider";
import { IlistProfiles } from "../../types/types";
import { TagSearch } from "../../component/TagSearch";
import { SortingGroup } from "../../component/SortingGroup";
import { getMatchesAPI } from "../../services/apiCalls";
import { actionProfilesList_getMatches } from "../../store/profilesLists/action";
import { actionUi_showSnackbar } from "../../store/ui/action";

const useStyles = makeStyles((theme) => ({
	drawer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "30vw",
		height: "100vh",
		overflow: "hidden",
		backgroundColor: "orange",
	},
	drawerContent: {
		display: "flex",
		flexDirection: "column",
		width: "60%",
	},
	main: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	toggleGroup: {
		backgroundColor: "blue",
	},
	cards: {
		display: "flex",
		backgroundColor: "pink",
		height: "85vh",
		overflow: "scroll",
		overflowX: "hidden",
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "80%",
		},
		justifyContent: "center",
		alignItems: "center",
	},
	loading: {
		alignSelf: "center",
		justifySelf: "center",
	},
	paginator: {
		justifyContent: "center",
		alignItems: "center",
	},
}));

interface Ilimits {
	minAge: number;
	maxAge: number;
	minPopularity: number;
	maxPopularity: number;
	maxDistance: number;
}

const initialValuesLimits = {
	minAge: 18,
	maxAge: 100,
	minPopularity: 0,
	maxPopularity: 100,
	maxDistance: 100,
};

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	tagList: state.user.tagList as string[],
	profilesRecco: state.profilesList.recommendations as IlistProfiles[],
	profilesSearch: state.profilesList.search as IlistProfiles[],
	profilesMatches: state.profilesList.matches as IlistProfiles[],
	isProfileComplete: isProfileComplete(
		state.user.profile,
		state.user.usagelocation,
		state.user.tagList
	),
}));

type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const MainPageComponent = (props: Props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [filterLimits, setFilterLimits] = useState<Ilimits>(
		initialValuesLimits
	);
	const [filterValues, setFilterValues] = React.useState<Ilimits>(
		initialValuesLimits
	);
	const [currentProfilesList, setCurrentProfilesList] = useState<
		null | IlistProfiles[]
	>(null);
	const [filteredProfilesList, setFilteredProfilesList] = useState<
		null | IlistProfiles[]
	>(null);
	const [loading, setLoading] = useState(false);
	const [toggleList, setToggleList] = useState<string | null>(null);
	const [pageIndex, setPageIndex] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [tagList, setTagList] = useState<string[]>();
	const [sortMethod, setSortMethod] = useState("");
	const [sortAsc, setSortAsc] = useState(true);
	const ITEMS_PER_PAGES = 20;

	const getMatchesList = () => {
		getMatchesAPI(props.loggedIn)
			.then((json) => {
				if (json && json.length) {
					const withAge = json.map((entry) => {
						entry.profile.age = entry.profile.dob
							? getAge(entry.profile.dob)
							: null;
						return entry;
					});
					props.dispatch(actionProfilesList_getMatches({ profiles: withAge }));
				}
			})
			.catch((error) => {
				props.dispatch(
					actionUi_showSnackbar({
						message: error.message,
						type: "error",
					})
				);
				console.log(error.message);
			});
	};

	useEffect(() => {
		if (!props.profilesRecco) {
			setLoading(true);
			props.isProfileComplete &&
				getRecommendationList(props.loggedIn, props.dispatch);
			getSearchList(props.loggedIn, props.dispatch);
			getMatchesList();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (props.isProfileComplete && props.profilesRecco) {
			setToggleList("Preselection");
		} else if (!props.isProfileComplete && props.profilesSearch) {
			setToggleList("Search");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.profilesRecco, props.profilesSearch]);

	useEffect(() => {
		if (toggleList === "Search") {
			setCurrentProfilesList(props.profilesSearch);
		} else if (toggleList === "Preselection") {
			setCurrentProfilesList(props.profilesRecco);
		} else if (toggleList === "Matches") {
			setCurrentProfilesList(props.profilesMatches);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toggleList]);

	useEffect(() => {
		if (currentProfilesList) {
			computeFilterLimits(currentProfilesList);
			setFilteredProfilesList(currentProfilesList);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentProfilesList]);

	useEffect(() => {
		if (filteredProfilesList) {
			loading && setLoading(false);
			setTotalPages(Math.ceil(filteredProfilesList.length / ITEMS_PER_PAGES));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filteredProfilesList]);

	const computeFilterLimits = (profilesArray: IlistProfiles[]) => {
		if (profilesArray.length) {
			const limitsArr = profilesArray.reduce<number[]>(
				(acc: number[], entry) => {
					const { age, popularityScore } = entry.profile;
					const { distanceInKm } = entry.location;
					if (age) {
						acc[0] = !acc[0] || acc[0] > age ? age : acc[0];
						acc[1] = !acc[1] || acc[1] < age ? age : acc[1];
					}
					if (popularityScore) {
						acc[2] =
							!acc[2] || acc[2] > popularityScore ? popularityScore : acc[2];
						acc[3] =
							!acc[3] || acc[3] < popularityScore ? popularityScore : acc[3];
					}
					if (distanceInKm) {
						acc[4] =
							!acc[4] || acc[4] < distanceInKm
								? Math.floor(distanceInKm)
								: acc[4];
					}
					return acc;
				},
				[]
			);
			const newLimits = {
				...filterLimits,
				minAge: limitsArr[0],
				maxAge: limitsArr[1],
				minPopularity: limitsArr[2],
				maxPopularity: limitsArr[3],
				maxDistance: limitsArr[4],
			};
			setFilterLimits(newLimits);
			setFilterValues(newLimits);
		}
	};

	const filterList = () => {
		if (currentProfilesList && filterValues) {
			const filtered = currentProfilesList.filter((entry) => {
				const { age, popularityScore } = entry.profile;
				const distance = entry.location
					? entry.location.distanceInKm
					: undefined;
				const distanceFilter = distance
					? Math.floor(distance) <= filterValues.maxDistance
					: true;
				const tagFilter = tagList
					? tagList.every((x) => entry.tag.includes(x))
					: true;
				return (
					age &&
					age >= filterValues.minAge &&
					age <= filterValues.maxAge &&
					popularityScore &&
					popularityScore >= filterValues.minPopularity &&
					popularityScore <= filterValues.maxPopularity &&
					distanceFilter &&
					tagFilter
				);
			});
			const sorted = filtered.sort(getSortFunction());
			setFilteredProfilesList(sorted);
		}
	};

	const getSortFunction = () => {
		let getFunction;
		switch (sortMethod) {
			case "Age":
				getFunction = ageSort;
				break;
			case "Popularity":
				getFunction = popularitySort;
				break;
			case "Distance":
				getFunction = distanceSort;
				break;
			case "Shared Interests":
				getFunction = tagsSort;
				break;
		}
		return getFunction;
	};

	const ageSort = (a: IlistProfiles, b: IlistProfiles) => {
		if (!a.profile.age && !b.profile.age) {
			return 0;
		} else if (!a.profile.age) {
			return -1;
		} else if (!b.profile.age) {
			return 1;
		} else if (a.profile.age < b.profile.age) {
			return sortAsc ? -1 : 1;
		} else {
			return sortAsc ? 1 : -1;
		}
	};

	const popularitySort = (a: IlistProfiles, b: IlistProfiles) => {
		if (!a.profile.popularityScore && !b.profile.popularityScore) {
			return 0;
		} else if (!a.profile.popularityScore) {
			return -1;
		} else if (!b.profile.popularityScore) {
			return 1;
		} else if (a.profile.popularityScore < b.profile.popularityScore) {
			return sortAsc ? -1 : 1;
		} else {
			return sortAsc ? 1 : -1;
		}
	};

	const distanceSort = (a: IlistProfiles, b: IlistProfiles) => {
		if (
			(!a.location || !a.location.distanceInKm) &&
			(!b.location || !b.location.distanceInKm)
		) {
			return 0;
		} else if (!a.location || !a.location.distanceInKm) {
			return -1;
		} else if (!b.location || !b.location.distanceInKm) {
			return 1;
		} else if (a.location.distanceInKm < b.location.distanceInKm) {
			return sortAsc ? -1 : 1;
		} else {
			return sortAsc ? 1 : -1;
		}
	};

	const tagsSort = (a: IlistProfiles, b: IlistProfiles) => {
		if (!a.tag && !b.tag) {
			return 0;
		} else if (!a.tag) {
			return -1;
		} else if (!b.tag) {
			return 1;
		} else if (
			props.tagList &&
			props.tagList.filter((x) => a.tag.includes(x)).length <
				props.tagList.filter((x) => b.tag.includes(x)).length
		) {
			console.log(
				props.tagList.filter((x) => a.tag.includes(x)).length,
				props.tagList.filter((x) => b.tag.includes(x)).length
			);
			return sortAsc ? -1 : 1;
		} else {
			props.tagList &&
				console.log(
					props.tagList.filter((x) => a.tag.includes(x)).length,
					props.tagList.filter((x) => b.tag.includes(x)).length
				);
			return sortAsc ? 1 : -1;
		}
	};

	const handleAgeFilter = (event: any, newAgeValues: number | number[]) => {
		const ageValues = newAgeValues as number[];
		setFilterValues({
			...filterValues,
			minAge: ageValues[0],
			maxAge: ageValues[1],
		});
	};

	const handlePopularityFilter = (
		event: any,
		newPopularityValues: number | number[]
	) => {
		const popularityValues = newPopularityValues as number[];
		setFilterValues({
			...filterValues,
			minPopularity: popularityValues[0],
			maxPopularity: popularityValues[1],
		});
	};

	const handleDistanceFilter = (
		event: any,
		newDistanceValue: number | number[]
	) => {
		const distanceValue = newDistanceValue as number;
		setFilterValues({
			...filterValues,
			maxDistance: distanceValue,
		});
	};

	const handleOpenDrawer = () => {
		setOpen(true);
	};

	const handleCloseDrawer = () => {
		setOpen(false);
		filterList();
	};

	const getCards = () => {
		if (filteredProfilesList) {
			return filteredProfilesList
				.slice(pageIndex * ITEMS_PER_PAGES, (pageIndex + 1) * ITEMS_PER_PAGES)
				.map((entry: IlistProfiles, index: number) => (
					<Grid item xs={12} sm={6} lg={4} key={index}>
						<ProfileCard entry={entry} />
					</Grid>
				));
		}
		return null;
	};

	const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
		setPageIndex(page - 1);
	};

	function handleChangeTags(
		e: React.ChangeEvent<{}>,
		value: string | string[],
		reason: string
	) {
		let tags = typeof value === "string" ? [value] : value;
		setTagList(tags);
	}

	const renderList = () => {
		return (
			<React.Fragment>
				<Button startIcon={<KeyboardArrowRight />} onClick={handleOpenDrawer}>
					SORT AND FILTER
				</Button>
				<Grid container className={classes.cards} spacing={5} justify="center">
					{getCards()}
					<Grid item xs={12}>
						<Pagination
							count={totalPages}
							showFirstButton
							showLastButton
							className={classes.paginator}
							onChange={changePage}
						/>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	};

	const renderNoMatches = () => {
		return (
			<Typography>Oh snap, you don't have any matches at the moment</Typography>
		);
	};

	return (
		<React.Fragment>
			<div className={classes.main}>
				<div className={classes.toggleGroup}>
					<ToggleGroup value={toggleList} setValue={setToggleList} />
				</div>
				{loading ? (
					<CircularProgress
						size={80}
						color="primary"
						className={classes.loading}
					/>
				) : toggleList === "Matches" && !currentProfilesList ? (
					renderNoMatches()
				) : (
					renderList()
				)}
			</div>
			<Drawer anchor="left" open={open} onClose={handleCloseDrawer}>
				<div className={classes.drawer}>
					<div className={classes.drawerContent}>
						<SortingGroup
							sortAsc={sortAsc}
							sortMethod={sortMethod}
							setSortAsc={setSortAsc}
							setSortMethod={setSortMethod}
						/>
						{filterLimits.minAge !== filterLimits.maxAge && (
							<MaterialDoubleSlider
								min={filterLimits.minAge}
								max={filterLimits.maxAge}
								value={[filterValues.minAge, filterValues.maxAge]}
								handleChange={handleAgeFilter}
							/>
						)}
						{filterLimits.minPopularity !== filterLimits.maxPopularity && (
							<MaterialDoubleSlider
								min={filterLimits.minPopularity}
								max={filterLimits.maxPopularity}
								value={[filterValues.minPopularity, filterValues.maxPopularity]}
								handleChange={handlePopularityFilter}
							/>
						)}
						{filterLimits.maxDistance && (
							<Slider
								min={0}
								max={filterLimits.maxDistance}
								value={filterValues.maxDistance}
								onChange={handleDistanceFilter}
								valueLabelDisplay="auto"
								aria-labelledby="range-slider"
							/>
						)}
						<TagSearch
							handleChangeTags={handleChangeTags}
							tagList={tagList || []}
						/>
					</div>
				</div>
			</Drawer>
		</React.Fragment>
	);
};

export const MainPage = withReduxProps(MainPageComponent);
