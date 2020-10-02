import { profile } from '../../types/types';
import { dataBase } from '../app';

export function getProfileByUserId(id: number): Promise<profile | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM profile WHERE userId = ${id}`;
		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result.length === 1 ? result[0] : null);
		});
	});
}

export function getProfileByUsername(
	username: string
): Promise<profile | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM profile WHERE username = '${username}'`;
		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result.length ? result[0] : null);
		});
	});
}

export function getAllProfile(id: number): Promise<profile[] | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM profile WHERE userId != ${id}`;
		dataBase.query(sql, (error: string, result: profile[]) => {
			if (error) {
				console.log(error);
				reject(null);
			}
			resolve(result.length ? result : null);
		});
	});
}

export function addProfile(profile: profile, userId: number): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `INSERT INTO profile (
			userId,
			age,
			username,
			firstname,
			lastname,
			genre,
			sexualOrientation,
			location,
			bio,
			img0,
			img1,
			img2,
			img3,
			img4
		) VALUES (
			${userId},
			${profile.age},
			'${profile.username}',
			'${profile.firstname}',
			'${profile.lastname}',
			'${profile.genre}',
			'${profile.sexualOrientation}',
			'${profile.location}',
			'${profile.bio}',
			'${profile.img0}',
			'${profile.img1}',
			'${profile.img2}',
			'${profile.img3}',
			'${profile.img4}'
		)`;
		dataBase.query(sql, async (error: string) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}

export function updateProfile(
	profile: profile,
	userId: number
): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `UPDATE profile SET
			age = ${profile.age},
			username = '${profile.username}',
			firstname = '${profile.firstname}',
			lastname= '${profile.lastname}',
			genre = '${profile.genre}',
			sexualOrientation = '${profile.sexualOrientation}',
			location = '${profile.location}',
			bio = '${profile.bio}'
		WHERE userId = ${userId}`;
		dataBase.query(sql, async (error: string) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}