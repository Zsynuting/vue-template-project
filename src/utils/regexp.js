export const idRegExp = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

export const integerRegExp = /^[+-]?[0-9]\d*$/;

export const doubleRegExp = /^[+-]?\d+(\.\d+)?(e[+-]\d+)?$/;

export const mobileRegExp = /^1[34578]\d{9}$/;

export const phoneRegExp = /^((0\d{2,3})-?)?([1-9]\d{6,7})$/;

export const longitudeRegExp = /^[\-\+]?(0?\d{1,2}\.\d{1,5}|1[0-7]?\d{1}\.\d{1,5}|180\.0{1,5})$/

export const latitudeRegExp = /^[\-\+]?([0-8]?\d{1}\.\d{1,5}|90\.0{1,5})$/