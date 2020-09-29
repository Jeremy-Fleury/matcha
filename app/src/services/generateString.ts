/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   generateString.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/09 16:20:01 by jfleury           #+#    #+#             */
/*   Updated: 2020/09/29 10:04:06 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export function generateActivationKey() {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < 32; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
}

export function generatePassword() {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-';
	const charactersLength = characters.length;
	for (let i = 0; i < 16; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
}
