// angularfirst.com/typescript-string-enums
const PlaceType = {
	bakery: 'bakery' as 'bakery',
	bar: 'bar' as 'bar',
	beauty_salon: 'beauty salon' as 'beauty salon',
	book_store: 'book store' as 'book store',
	cafe: 'cafe' as 'cafe',
	clothing_store: 'clothing store' as 'clothing store',
	department_store: 'department store' as 'department store',
	electronics_store: 'electronics store' as 'electronics store',
	florist: 'florist' as 'florist',
	hardware_store: 'hardware store' as 'hardware store',
	home_goods_store: 'home goods store' as 'home goods store',
	meal_delivery: 'meal delivery' as 'meal delivery',
	meal_takeaway: 'meal takeaway' as 'meal takeaway',
	restaurant: 'restaurant' as 'restaurant',
	shoe_store: 'shoe store' as 'shoe store',
	store: 'store' as 'store'
}

type PlaceType = (typeof PlaceType)[keyof typeof PlaceType];
export { PlaceType };
