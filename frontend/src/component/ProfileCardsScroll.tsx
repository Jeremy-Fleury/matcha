/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileCardsScroll.tsx                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:05 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/06 12:40:18 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { InListProfileCard } from "./InListProfileCard";
import { Iprofile } from "../types/types";

const styleList: React.CSSProperties = {
	width: "100%",
	overflow: "scroll",
	maxHeight: "100%",
};

type Props = {
	list: Iprofile[] | undefined;
};

export function ProfileCardsScroll(props: Props) {
	const cards = props.list
		? props.list.map((entry) => (
				<ListItem key={entry.username}>
					<InListProfileCard entry={entry}></InListProfileCard>
				</ListItem>
		  ))
		: null;
	return <List style={styleList}>{cards}</List>;
}
