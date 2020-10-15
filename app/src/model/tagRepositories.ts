/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tagRepositories.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:26 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/15 15:10:54 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { tag, tagProfile } from '../../types/types';
import { dataBase } from '../app';

export function getTag(tag: string): Promise<tag | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM tag WHERE tag = '${tag}'`;
		dataBase.query(sql, (error: string, result: tag[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result && result.length ? result[0] : null);
		});
	});
}

export function getAllTag(): Promise<{ tag: string }[] | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM tag`;
		dataBase.query(sql, (error: string, result: { tag: string }[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result);
		});
	});
}

export function getTagAutocomplete(
	partial: string,
	limit: number
): Promise<{ tag: string }[]> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT tag from tag WHERE tag LIKE '${partial}%' LIMIT ${limit}`;
		dataBase.query(sql, (error, result: { tag: string }[]) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			resolve(result);
		});
	});
}

export function getTagById(id: number): Promise<tag | null> {
	return new Promise((resolve) => {
		const sql = `SELECT * FROM tag WHERE id = ${id}`;
		dataBase.query(sql, (error: string, result: tag[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result && result.length === 1 ? result[0] : null);
		});
	});
}

export function addTag(tag: string): Promise<string | null> {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO tag (tag) VALUES ('${tag}')`;
		dataBase.query(sql, (error, result) => {
			if (error) {
				if (error.errno === 1062) {
					resolve("Tag already exsist");
				}
				reject(error);
			}
			if (result && result.affectedRows) {
				resolve(tag);
			}
			reject("Error: an error occured");
		});
	});
}
