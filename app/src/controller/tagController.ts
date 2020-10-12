import { Request, Response } from 'express';

import { getProfileByUserId } from '../model/profileRepositories';
import {
	addTagProfile, deleteTagProfile, getTag, getTagProfile
} from '../model/tagRepositories';
import { addNewTag } from '../services/addNewTag';
import { jwtVerify } from '../services/jwt';

/*
export async function addTagProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		console.log("-> tag start id = ", jwt.decoded.id);
		try {
			await addNewTag(req.body.tagList);
			const tagProfile = await getTagProfile(jwt.decoded.id);
			const tagProfileFilter = tagProfile.map((item) => item.tag);
			const tagList: string[] = req.body.tagList.filter((item) => {
				return !tagProfileFilter.includes(item);
			});
			const tabResult = [];
			await Promise.all(
				tagList.map(async (item) => {
					const tag = await getTag(item);
					const result = await addTagProfile(jwt.decoded.id, tag.id);
					tabResult.push(tag.tag);
				})
			);
			res.status(200).json(tabResult);
		} catch {
			res.status(400).send("ERROR");
		}
		console.log("-> tag end id = ", jwt.decoded.id);
	}
}
*/
export function addTagProfileController(req: Request, res: Response) {
	jwtVerify(req.headers.token, res).then((jwt) => {
		addNewTag(req.body.tagList).then(() => {});
		getTagProfile(jwt.decoded.id)
			.then((tagProfile) => tagProfile.map((item) => item.tag))
			.then((tagProfileFilter) => {});
	});
}

export async function deleteTagProfileController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const tagProfilelist = await getTagProfile(jwt.decoded.id);
		const tagList: string[] = [];
		await Promise.all(
			tagProfilelist.map((tag) => {
				if (!tagList.includes(tag.tag)) {
					tagList.push(tag.tag);
				}
			})
		);
		const profile = await getProfileByUserId(jwt.decoded.id);
		const tag = await getTag(req.body.tag);
		if (tagList.length) {
			let isDeletedTagProfile = false;
			await Promise.all(
				tagList.map(async (tagProfile) => {
					if (tagProfile === tag.tag) {
						isDeletedTagProfile = await deleteTagProfile(
							tag.id,
							profile.userId
						);
						return;
					}
				})
			);
			if (isDeletedTagProfile) {
				res.status(200).send("delete tag successful");
				return;
			}
		}
	}
	res.status(400).send("An error occured");
}
