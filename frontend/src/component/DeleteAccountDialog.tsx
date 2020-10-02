/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   DeleteAccountDialog.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:10 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/25 16:39:53 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { connect, ConnectedProps } from "react-redux";
import { fetchApi } from "../services/fetchApi";
import * as constants from "../services/constants";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.signin.isLoggedIn,
	user: state.user.signin.user,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

function DeleteAccountDialogComponent(props: Props) {
	const [open, setOpen] = useState(false);
	let [password, setPassword] = useState<string | null>("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		handleClose();
	}

	function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}

	const handleDeleteAccount = () => {
		fetchApi<{ user: Object; token: string }>(
			constants.URL + constants.URI_DELETE_ACCOUNT,
			{
				method: constants.POST_METHOD,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
					Authorization: props.loggedIn,
				},
				credentials: "include",
			}
		)
			.then(() => {})
			.catch((error) => {});
	};

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Delete Account
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">Delete Account</DialogTitle>
					<DialogContent>
					<TextField
							margin="dense"
							label="Password"
							type="password"
							variant="filled"
							fullWidth
							value={password}
							onChange={handlePassword}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button
							onClick={handleDeleteAccount}
							type="submit"
							color="primary"
							disabled={password === ""}
						>
							DELETE MY ACCOUNT
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

export const DeleteAccountDialog = withReduxProps(DeleteAccountDialogComponent);