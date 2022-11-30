export interface Event {
	id: string
	title: string
	description: string | null
	location: string | null
	date: string
	image: string | null
	isFeatured: boolean
}

export interface DateFilter {
	month: number
	year: number
}
