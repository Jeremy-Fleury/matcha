/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ChatPage.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/23 17:16:18 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { ChatBox } from '../../component/chat/chatBox';
import { ChatListProfile } from '../../component/chat/chatListProfile';
import { socket } from '../../domain/root/App';
import { getMatchesAPI } from '../../services/apiCalls';
import { IextendedProfile } from '../../types/types';

const withReduxProps = connect((state: any) => ({
	profile: state.user.profile,
	token: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const ChatPageComponent = (props: Props) => {
	const [tabMatch, setTableMatch] = useState<IextendedProfile[]>([]);
	const [userSelect, setUserSelect] = useState<string | null>(null);
	const [message, setMessage] = useState<{
		sender: string;
		message: string;
		timestamp: number;
	} | null>(null);

	useEffect(() => {
		getMatchesAPI(props.token)
			.then((item) => {
				setTableMatch(item);
				if (item && item.length) {
					setUserSelect(item[0].username);
				}
			})
			.catch((error) => console.log(error));
	}, []);

	function callBack(item: {
		sender: string;
		message: string;
		timestamp: number;
	}) {
		setMessage({
			sender: item.sender,
			message: item.message,
			timestamp: item.timestamp,
		});
	}

	useEffect(() => {
		socket.on(props.profile.username, callBack);
	}, []);

	useEffect(() => {
		setMessage(null);
	}, [userSelect]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				position: "absolute",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
			}}
		>
			<ChatListProfile
				tabMatch={tabMatch}
				userSelect={userSelect}
				setUserSelect={setUserSelect}
			/>
			<ChatBox
				userProfile={props.profile}
				userSelect={userSelect}
				message={message}
			/>
		</div>
	);
};

export const ChatPage = withReduxProps(ChatPageComponent);