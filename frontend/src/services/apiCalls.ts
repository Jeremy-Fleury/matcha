/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   apiCalls.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/27 14:19:04 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/03 11:20:41 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { isEqual, uniqWith } from "lodash";
import * as constants from "../services/constants";
import { Iaddress, Iprofile, IlistProfiles, user } from "../types/types";
import { fetchApi } from "./fetchApi";

export const signupAPI = (details: Object) => {
	return fetchApi<{ user: user; token: string }>(
		constants.URL + constants.URI_SIGNUP,
		{
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
			},
			body: details,
		}
	);
};

export const signinAPI = (details: Object) => {
	return fetchApi<{ user: user; token: string }>(
		constants.URL + constants.URI_SIGNIN,
		{
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
			},
			body: details,
		}
	);
};

export const deleteAPI = (details: Object, token: string) => {
	return fetchApi<{ user: Object; token: string }>(
		constants.URL + constants.URI_DELETE_ACCOUNT,
		{
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
			body: details,
			credentials: "include",
		}
	);
};

export const getProfileAPI = (token: string) => {
	return fetchApi<{
		profile: Iprofile;
		tag: string[] | [];
		location: Iaddress | null;
	}>(constants.URL + constants.URI_GET_PROFILE, {
		method: constants.GET_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
	});
};

export const getRecommendationAPI = (token: string) => {
	return fetchApi<IlistProfiles[]>(
		constants.URL + constants.URI_GET_RECOMMENDATIONS,
		{
			method: constants.GET_METHOD,
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
			credentials: "include",
		}
	);
};

export const getMatchesAPI = (token: string) => {
	return fetchApi<IlistProfiles[]>(constants.URL + constants.URI_GET_MATCHES, {
		method: constants.GET_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
	});
};

export const getAllProfilesAPI = (token: string) => {
	return fetchApi<IlistProfiles[]>(
		constants.URL + constants.URI_GET_ALL_PROFILES,
		{
			method: constants.GET_METHOD,
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
			credentials: "include",
		}
	);
};

export const modifyEmailAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_UPDATE_EMAIL, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		body: details,
		credentials: "include",
	});
};

export const modifyPasswordAPI = (details: Object, token: string) => {
	return fetchApi<{ user: Object; token: string }>(
		constants.URL + constants.URI_MODIFY_PASSWORD,
		{
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
			credentials: "include",
			body: details,
		}
	);
};

export const postPicturesAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_POST_PICTURES, {
		method: constants.POST_METHOD,
		headers: {
			token: token,
		},
		body: details,
		credentials: "include",
	});
};

export const createProfileAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_CREATE_PROFILE, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
		body: details,
	});
};

export const updateProfileAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_UPDATE_PROFILE, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
		body: details,
	});
};

export const postTagsAPI = (details: Object, token: string) => {
	return fetchApi<string[]>(constants.URL + constants.URI_POST_TAGS, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
		body: details,
	});
};

export const activateAccountAPI = (details: Object) => {
	return fetchApi<{ user: Object; token: string }>(
		constants.URL + constants.URI_ACTIVATE_ACCOUNT,
		{
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
			},
			body: details,
		}
	);
};

export const handleGeoLocationAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_HANDLE_GEOLOCATION, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
		body: details,
	});
};

export const handleUsageLocationAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_HANDLE_USAGELOCATION, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
		body: details,
	});
};

export const visitProfileAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_VISIT_PROFILE, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
		body: details,
	});
};

export const getProfileVisitsAPI = (token: string) => {
	return fetchApi<IlistProfiles[]>(
		constants.URL + constants.URI_GET_PROFILE_VISITS,
		{
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
			credentials: "include",
		}
	);
};

export const getProfileLikesAPI = (token: string) => {
	return fetchApi<IlistProfiles[]>(
		constants.URL + constants.URI_GET_PROFILE_LIKES,
		{
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
			credentials: "include",
		}
	);
};

export const likeProfileAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_LIKE_PROFILE, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
		body: details,
	});
};

export const unlikeProfileAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_UNLIKE_PROFILE, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
		body: details,
	});
};

export const blacklistProfileAPI = (details: Object, token: string) => {
	return fetchApi(constants.URL + constants.URI_BLACKLIST_PROFILE, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
		body: details,
	});
};

export const getBlackListAPI = (token: string) => {
	return fetchApi<string[]>(constants.URL + constants.URI_GET_BLACKLIST, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
	});
};

export const getTagAutocompleteAPI = (details: Object, token: string) => {
	return fetchApi<string[]>(
		constants.URL + constants.URI_GET_TAG_AUTOCOMPLETE,
		{
			method: constants.POST_METHOD,
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
			credentials: "include",
			body: details,
		}
	);
};

const createAddressFromBody = (body: any): Iaddress[] | null => {
	console.log(body);
	if (body && body.results.length) {
		const filtered: any[] = body.results.filter(
			(entry: any) => entry && entry.address
		);
		return uniqWith(
			filtered
				.map((entry: any) => {
					const { address, position } = entry;
					console.log(address, position);
					return {
						city: address.municipality.split(",")[0] || null,
						countryCode: address.countryCode || null,
						postCode: address.postalCode || null,
						country: address.country || null,
						isFromGeolocation: false,
						lat: (position && position.lat) || null,
						lng: (position && position.lon) || null,
					};
				})
				.filter((entry) => entry.postCode),
			isEqual
		);
	}
	return null;
};

export const autocompleteLocationAPI = async (input: string) => {
	return fetchApi<any[]>(
		constants.URI_AUTOCOMPLETE_API +
			encodeURIComponent(input) +
			".json?key=" +
			constants.TOMTOM_API_KEY +
			"&language=fr-FR&typeahead=true&countrySet=FR&idxSet=Geo%2CAddr%2CPAD&limit=5",
		{
			method: constants.GET_METHOD,
		}
	).then((json: any[]) => {
		return createAddressFromBody(json);
	});
};

export const getMessageAPI = async (details: Object, token: string) => {
	return fetchApi<any[]>(constants.URL + constants.URI_GET_CHAT_MESSAGE, {
		method: constants.POST_METHOD,
		headers: {
			"Content-Type": "application/json",
			token: token,
		},
		credentials: "include",
		body: details,
	});
};
