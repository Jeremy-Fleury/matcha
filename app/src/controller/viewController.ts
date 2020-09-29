/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   viewController.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/28 17:15:48 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/29 11:44:14 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';

import { getProfileByUsername } from '../model/profileRepositories';
import { addView, getView } from '../model/viewRepositories';
import { jwtVerify } from '../services/jwt';

export async function getViewController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const viewList = await getView(jwt.decoded.id);
		if (viewList && viewList.length) {
			res.status(200).json(viewList);
			return;
		}
	}
	res.status(400).send('ERROR_OCCURED');
}

export async function addViewController(req: Request, res: Response) {
	const jwt = await jwtVerify(req.headers.token, res);
	if (jwt && jwt.isLogin) {
		const profileSeen = await getProfileByUsername(req.body.username);
		if (profileSeen) {
			const add = await addView(profileSeen.userId, jwt.decoded.id);
			if (add) {
				res.status(200).send('Add view');
				return;
			}
		}
	}
	res.status(400).send('ERROR_OCCURED');
}
