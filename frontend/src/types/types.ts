/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   types.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:24:37 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/16 18:45:55 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export interface Ilocation {
	geoLocation: Iaddress | null;
	usageLocation: Iaddress | null;
}

export interface Iaddress {
	city: string | null;
	postCode: string | null;
	countryCode: string | null;
	country: string | null;
	isFromGeolocation: boolean;
	lat: number | null;
	lng: number | null;
}

export interface Icoordinates {
	latitude: number;
	longitude: number;
}

export interface user {
	id: number;
	email: string;
	password: string;
	registrationDate: number;
	activated: boolean;
	activationKey: string;
}

export interface Iimgs {
	[index: number]: string | null;
}

export interface Iprofile {
	dob: number | null;
	username: string;
	firstname: string;
	lastname: string;
	gender: string | null;
	sexualOrientation: string;
	bio: string | null;
	geoLocationAuthorization: boolean;
	location: Ilocation;
	tagList: string[] | null;
}

export interface IgetProfile {
	profile: any;
	tags: any;
	location: any;
}

export interface like {
	profileLikesId: number;
	profileHasBeenLikedId: number;
}

export interface notification {
	profileNotifedId: number;
	notifierProfileId: number;
	date: number;
	notification: string;
}

export interface tag {
	id: number;
	tag: string;
}

export interface tagProfile {
	idProfile: number;
	idTag: number;
}
