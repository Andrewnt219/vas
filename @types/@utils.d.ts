declare module '@utils' {
	type ComponentProps<T extends object> = React.ComponentProps<T>;
	type SliceProps<T extends object> = ComponentProps<T>['slice'];
}
