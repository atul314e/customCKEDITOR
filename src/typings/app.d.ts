/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description app types
 */

declare namespace App {
	interface IValues {
		basePath: string;
		error: boolean;
		loading: boolean;
	}
	interface IActions {
		syncAppData: (basePath: string | undefined) => void;
	}
	interface IContentAreaProps {}

	interface IErrorBoundaryProps {
		error: Error;
		info: React.ErrorInfo;
		children: React.ReactNode;
		actions: IErrorBoundaryActions;
	}
}
