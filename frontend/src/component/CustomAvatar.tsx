/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CustomAvatar.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/30 17:38:42 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/16 16:44:46 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

import { Avatar, makeStyles } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

interface Props {
	src: string | null;
	id: number;
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles({
	avatar: {
		width: (props: Props) =>
			props.id === 0 ? "min(15vh, 6vw)" : "min(12vh, 5vw)",
		height: (props: Props) =>
			props.id === 0 ? "min(15vh, 6vw)" : "min(12vh, 5vw)",
		"&:hover": {
			opacity: 0.6,
		},
		borderRadius: "50%",
		zIndex: 10,
	},
	input: {
		display: "none",
	},
});

export const CustomAvatar = (props: Props) => {
	const classes = useStyles(props);
	let fileUpload: React.RefObject<HTMLInputElement> = React.createRef();

	const showFileUpload = () => {
		if (fileUpload && fileUpload.current !== null) {
			fileUpload.current.click();
		}
	};

	return (
		<React.Fragment>
			<input
				name={props.id.toString()}
				className={classes.input}
				accept="image/*"
				type="file"
				ref={fileUpload}
				onChange={props.handleChange}
			/>
			{props.src !== null ? (
				<Avatar
					className={classes.avatar}
					src={props.src}
					onClick={showFileUpload}
				/>
			) : (
				<Avatar className={classes.avatar} onClick={showFileUpload}>
					<PhotoCameraIcon />
				</Avatar>
			)}
		</React.Fragment>
	);
};
