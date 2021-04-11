declare module '@prismic-slices' {
	type SliceComponentProps<S extends Slice> = {
		className?: string;
		slice: S;
	};
	type Slice = {
		slice_type: string;
		slice_label: string | null;
		items: unknown[];
		primary: Record<string, any>;
	};
}
