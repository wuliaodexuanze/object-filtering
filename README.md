[TOC]

# object-filtering

## use
```
npm i object-filtering
```

## example
```javascript
const d = {
	a: 1,
	b: 2,
	c: 3,
	d: 4,
	e: 5,
	f: 6
}
const ret = objectFiltering(d, 'c');
// {c: 3}

const ret = objectFiltering(d, {
	include: ['a', 'b']
});
// {a: 1, b: 2}

const ret = objectFiltering(d, {
	exclude: ['a', 'f', 'e']
});
// { b: 2, c: 3, d: 4 }
```