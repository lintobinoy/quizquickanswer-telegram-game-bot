/**
 * Users database
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import { Schema, model } from "mongoose";
import type { TelegramUserInterface } from "@app/types/databases.type";
import type { GameInterface } from "@app/types/game.type.js";

const schema = new Schema<GameInterface>({
	id: { type: String, required: true },
	is_bot: { type: Boolean, required: true },
	first_name: { type: String, required: true },
	username: { type: String, required: true },
	launguage_code: String,
	question: String,
	description: String,
	group_id: Number,
});

const query = model<TelegramUserInterface>("User", schema);

/**
 * Users CRUD
 * =====================
 * Add user to DB
 *
 * @param {TelegramUserInterface} user - user to add
 */
const add = async (user: TelegramUserInterface): Promise<void> => {
	try {
		const doc = new query(user);
		await doc.save();
	} catch (error) {
		console.log(error);
	}
};

/**
 * Users CRUD
 * =====================
 * Remove user from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 */
const remove = async (search: Record<string, number | string | boolean>): Promise<void> => {
	try {
		query.findOneAndDelete(search, function (err) {
			if (err) {
				return err;
			}
		});
	} catch (error) {
		console.log(error);
	}
};

/**
 * Users CRUD
 * =====================
 * Update user from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @param {TelegramUserInterface} user - user info to update
 */
const update = async (
	search: Record<string, number | string | boolean>,
	user: TelegramUserInterface,
): Promise<void> => {
	try {
		query.findOneAndUpdate(search, user, function (err) {
			if (err) {
				return err;
			}
		});
	} catch (error) {
		console.log(error);
	}
};

/**
 * Users CRUD
 * =====================
 * Get user from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {TelegramUserInterface[]} user.

 */
const get = async (search: Record<string, number | string | boolean>): Promise<void> => {
	try {
		const user = await query.findOne(search, function (err) {
			if (err) {
				return err;
			}
		});
		return user;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export { get, update, remove, add };
export default { get, update, remove, add };