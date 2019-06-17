/**
 *
 * @static
 * @memberOf objectFiltering
 * @category objectFiltering
 * @param {*} value The value to check.
 * @returns {key:val}.
 * @example

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
 */

function isObjectLike(value) {
	return value != null && typeof value == 'object';
}

function getPrototype(arg) {
	return Object.getPrototypeOf(Object(arg));
}

function isPlainObject(value) {
	const funcProto = Function.prototype;
	const objectProto = Object.prototype;
	const funcToString = funcProto.toString;
	const hasOwnProperty = objectProto.hasOwnProperty;
	const objectCtorString = funcToString.call(Object);

	if (!isObjectLike(value)) {
		return false;
	}
	var proto = getPrototype(value);
	if (proto === null) {
		return true;
	}
	var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	return typeof Ctor == 'function' && Ctor instanceof Ctor &&
		funcToString.call(Ctor) == objectCtorString;
}

function objectFiltering(data, strOrPlainObject) {
	try {
		let newData = JSON.parse(JSON.stringify(data));
		if (typeof strOrPlainObject === 'string') {
			newData = JSON.parse(JSON.stringify(newData, [strOrPlainObject]));
		}

		if (isPlainObject(strOrPlainObject)) {
			const include = strOrPlainObject['include'] || '';
			const exclude = strOrPlainObject['exclude'] || '';
			if (include) {
				newData = JSON.parse(JSON.stringify(newData, include));
			}
			if (!include && exclude) {
				const dataStr = JSON.stringify(newData, function(k, v) {
					if (!~exclude.indexOf(k)) {
						return v;
					}
				});

				newData = JSON.parse(dataStr);
			}
		}

		return newData;
	} catch (err) {
		return data;
	}
}

module.exports = {
	objectFiltering
}