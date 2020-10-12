/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/14 11:11:35 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/12 13:36:25 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { createConnection } from 'mysql';

let dataBase = null;

function initMysql() {
	dataBase = createConnection({
		host: "fj199397-001.dbaas.ovh.net",
		port: 35833,
		user: "jfleury",
		database: "matcha",
		password: "Matcha1234",
	});
	dataBase.connect((error) => {
		if (error) {
			throw error;
		}
		console.log("\x1b[33m" + "mysql connected" + "\x1b[0m");
	});
}

export async function addTableUser() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE user (
			id					INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
			email				TEXT NOT NULL,
			password			TEXT NOT NULL,
			registrationDate	TEXT NOT NULL,
			activated			BOOLEAN DEFAULT 0 NOT NULL,
			activationKey		CHAR(32) NOT NULL
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table user created");
			resolve();
		});
	});
}

export async function addTableProfile() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE profile (
			userId							INTEGER NOT NULL,
			dob								BIGINT NOT NULL,
			popularityScore					INTEGER DEFAULT 50 NOT NULL,
			username	 					TEXT NOT NULL,
			firstname						TEXT NOT NULL,
			lastname						TEXT NOT NULL,
			gender							TEXT,
			geoLocationAuthorization		BOOLEAN DEFAULT 0 NOT NULL,
			sexualOrientation				TEXT NOT NULL,
			bio								TEXT,
			FOREIGN KEY (userId) 			REFERENCES user(id) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table profile created");
			resolve();
		});
	});
}

export async function addTableGeoLocation() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE geoLocation (
			userId							INTEGER NOT NULL,
		    city							TEXT,
    		postCode						TEXT,
    		countryCode						TEXT,
    		country							TEXT,
    		lat								FLOAT,
    		lng								FLOAT,
			FOREIGN KEY (userId) 			REFERENCES user(id) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table geoLocation created");
			resolve();
		});
	});
}

export async function addTableUsageLocation() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE usageLocation (
			userId							INTEGER NOT NULL,
		    city							TEXT NOT NULL,
    		postCode						TEXT,
    		countryCode						TEXT,
    		country							TEXT,
    		lat								FLOAT,
    		lng								FLOAT,
			FOREIGN KEY (userId) 			REFERENCES user(id) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table usageLocation created");
			resolve();
		});
	});
}

export function addTableLike() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE likeProfile (
			profileLikesId							INTEGER NOT NULL,
			profileHasBeenLikedId					INTEGER NOT NULL,
			FOREIGN KEY (profileLikesId) 			REFERENCES profile(userId) ON DELETE CASCADE,
			FOREIGN KEY (profileHasBeenLikedId) 	REFERENCES profile(userId) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table likeProfile created");
			resolve();
		});
	});
}

export async function addTableNotification() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE notificationProfile (
			id										INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
			profileNotifedId						INTEGER NOT NULL,
			notifierProfileId						INTEGER NOT NULL,
			date									TEXT NOT NULL,
			notification							TEXT NOT NULL,
			isRead									INTEGER DEFAULT 0 NOT NULL,
			FOREIGN KEY (profileNotifedId) 			REFERENCES profile(userId) ON DELETE CASCADE,
			FOREIGN KEY (notifierProfileId) 		REFERENCES profile(userId) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table notificationProfile created");
			resolve();
		});
	});
}

export async function addTableTag() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE tag (
			id					INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
			tag					TEXT NOT NULL
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table tag created");
			resolve();
		});
	});
}

export async function addTableTagProfile() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE tagProfile (
			tagId							INTEGER NOT NULL,
			profileId						INTEGER NOT NULL,
			FOREIGN KEY (tagId) 			REFERENCES tag(id) ON DELETE CASCADE,
			FOREIGN KEY (profileId) 		REFERENCES profile(userId) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table tagProfile created");
			resolve();
		});
	});
}

export async function addTableViewProfile() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE viewProfile (
			profileSeenId						INTEGER NOT NULL,
			viewerProfileId						INTEGER NOT NULL,
			viewDate							TEXT NOT NULL,
			FOREIGN KEY (profileSeenId) 		REFERENCES profile(userId) ON DELETE CASCADE,
			FOREIGN KEY (viewerProfileId) 		REFERENCES profile(userId) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table viewProfile created");
			resolve();
		});
	});
}

export async function dropTable(nameTable: string) {
	return new Promise((resolve) => {
		const sql = `DROP TABLE ${nameTable}`;
		dataBase.query(sql, (error: string, result) => {
			if (error) throw error;
			console.log(`Table ${nameTable} deleted`);
			resolve();
		});
	});
}
async function main() {
	initMysql();
	//dropTable("profile");

	await addTableUser();
	await addTableProfile();
	await addTableUsageLocation();
	await addTableGeoLocation();
	await addTableLike();
	await addTableNotification();
	await addTableTag();
	await addTableTagProfile();
	await addTableViewProfile();
}
main();