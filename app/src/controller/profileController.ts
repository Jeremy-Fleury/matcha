import { Request, Response } from 'express';
import { ModuleResolutionKind } from 'typescript';

import {
	addProfile,
	getAllProfile,
	getProfileByUserId,
	getProfileByUsername,
	getProfileTest,
	updateProfile
} from '../model/profileRepositories';
import { getTagById, getTagProfile } from '../model/tagRepositories';
import { jwtVerify } from '../services/jwt';
import { profileValidation } from '../services/profileValidation';

var _ = require("lodash");
/*
export async function getProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profile = await getProfileByUserId(jwt.decoded.id); //dev
		const tagProfileList = await getTagProfile(jwt.decoded.id);
		const tagList = await Promise.all(
			tagProfileList.map(async (item) => {
				const tag = await getTagById(item.tagId);
				return tag.tag;
			})
		);
		if (profile) {
			res.status(200).json({ profile: profile, tag: tagList });
			return;
		}
	}
	res.status(400).send("An error occured");
}
*/
export async function getProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profile = await getProfileByUserId(jwt.decoded.id); //dev
		const tagProfileList = await getTagProfile(jwt.decoded.id);
		const listTag: string[] = [];
		await Promise.all(
			tagProfileList.map((tag) => {
				if (!listTag.includes(tag.tag)) {
					listTag.push(tag.tag);
				}
			})
		);
		res.status(200).json({ profile: profile, tag: listTag });
		return;
	}
	res.status(400).send("An error occured");
}

export async function getProfileByUsernameController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profile = await getProfileByUsername(req.query.username as string);
		if (profile) {
			res.status(200).json(profile);
			return;
		}
	}
	res.status(400).send("An error occured");
}

export async function getAllProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profileList = await getProfileTest(jwt.decoded.id);
		if (profileList && profileList.length) {
			res.status(200).json(profileList);
			return;
		}
	}
	res.status(400).send("An error occured");
}

export async function addProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const myProfile = await getProfileByUserId(jwt.decoded.id);
		if (myProfile) {
			res.status(400).send("PROFILE_EXSIST");
			return;
		}
		const profile = await getProfileByUsername(req.body.username);
		const validation = await profileValidation(req.body, res, jwt.decoded.id, profile);
		if (validation) {
			const result = await addProfile(req.body, jwt.decoded.id);
			if (result) {
				res.status(200).send("Profile has been created");
				return;
			}
		}
	} else {
		res.status(400).send("An error occured");
	}
}

export async function updateProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profile = await getProfileByUsername(req.body.username);
		const validation = await profileValidation(req.body, res, jwt.decoded.id, profile);
		if (validation) {
			const result = await updateProfile(req.body, jwt.decoded.id);
			if (result) {
				res.status(200).send("Profile has been update");
				return;
			}
		}
	} else {
		res.status(400).send("An error occured");
	}
}
