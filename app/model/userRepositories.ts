/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userRepositories.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/10 15:07:41 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/16 17:02:48 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { dataBase } from '../app';
import { user } from '../types/types';
import { generateActivationKey } from '../services/generateActivationKey';

export function getUserById(id: number): Promise<user | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM user WHERE id = ${id}`;
		dataBase.query(sql, (error: string, result: user[]) => {
			if (error) {
				console.log(error);
				reject(null);
			}
			resolve(result && result.length === 1 ? result[0] : null);
		});
	});
}

export function getUserByEmail(email: string): Promise<user | null> {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM user WHERE email = '${email}'`;
		dataBase.query(sql, (error: string, result: user[]) => {
			if (error) {
				console.log(error);
				reject(null);
			}
			resolve(result && result.length === 1 ? result[0] : null);
		});
	});
}

export function addUser(email: string, password: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
		const activationKey = generateActivationKey();
		const sql = `INSERT INTO user (
			email,
			password,
			registrationDate,
			activationKey
		) VALUES (
			'${email}',
			'${password}',
			'${date}',
			'${activationKey}'
		)`;
		dataBase.query(sql, async (error: string) => {
			if (error) {
				console.log(error);
				reject(false);
			}
			resolve(true);
		});
	});
}

export async function activateUser(id: number): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `UPDATE user SET activated = TRUE WHERE id = ${id}`;
		dataBase.query(sql, (error: string) => {
			if (error) {
				console.log(error);
				reject(false);
			}
			resolve(true);
		});
	});
}

export async function deleteUser(id: number): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `DELETE FROM user WHERE id = ${id}`;
		dataBase.query(sql, (error: string) => {
			if (error) {
				console.log(error);
				reject(false);
			}
			resolve(true);
		});
	});
}
