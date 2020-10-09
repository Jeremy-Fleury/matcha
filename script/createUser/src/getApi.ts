/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   getApi.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 18:41:30 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/09 16:52:10 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HOW_MANY_CREATE_USER } from './const';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

export function getApiRandonUser() {
	return new Promise((resolve, rejects) => {
		var request = new XMLHttpRequest();
		request.open(
			"GET",
			`https://randomuser.me/api/?results=${HOW_MANY_CREATE_USER}&nat=fr`,
			true
		);

		request.onload = function () {
			if (request.status == 200) {
				var data = JSON.parse(request.responseText);
				resolve(data);
			} else if (request.status <= 500) {
				var data = JSON.parse(request.responseText);
				rejects(null);
			} else {
				rejects(null);
			}
		};

		request.onerror = function () {
			console.log("unable to connect to server");
		};

		request.send(); // make the request
	});
}

export function getApiLocationUser(param: string) {
	return new Promise((resolve, rejects) => {
		var apikey = "102a4a73c0c24ac6bd57d86d944ce895";
		var api_url = "https://api.opencagedata.com/geocode/v1/json";
		var request_url =
			api_url +
			"?" +
			"key=" +
			apikey +
			"&q=" +
			encodeURIComponent(param) +
			"&pretty=1" +
			"&no_annotations=1";

		var request = new XMLHttpRequest();
		request.open("GET", request_url, true);

		request.onload = function () {
			if (request.status == 200) {
				var data = JSON.parse(request.responseText);
				resolve(data);
			} else if (request.status <= 500) {
				var data = JSON.parse(request.responseText);
				rejects(null);
			} else {
				rejects(null);
			}
		};

		request.onerror = function () {
			console.log("unable to connect to server");
		};

		request.send();
	});
}
