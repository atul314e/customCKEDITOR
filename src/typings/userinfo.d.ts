/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description userinfo types
 */

declare type IUser = Record<'id' | 'email' | 'name', string> & Record<'realmRoles', string[]>;

declare namespace UserNS {
	interface IValues {
		id: string;
		email: string;
		name: string;
		realmRoles: string;
	}
}
