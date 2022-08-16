import { Branch } from "../interfaces/branch";

export function orderBy(key: any, data: any[]): any {
    const dataCopy = [...data]

    const result = dataCopy.sort((a, b) => {
        if (a[key] > b[key]) return 1;
        if (a[key] < b[key]) return -1;
        return 0;
    });
    return result;
}

export function groupBy(key: any, data: Branch[]): any {
    const dataCopy = [...data]
    const dataOrdered = orderBy('nome', dataCopy)

    let result = dataOrdered.reduce((partial: any, actual: any) => {
        const group = actual[key]

        if(!partial[group]) partial[group] =[]
        partial[group].push(actual)
        return partial
    }, {});
    return result;
}

export function fold(f:Function, acumulador:any, array: any[]) {
	for (const a of array) {
		acumulador = f(a,acumulador)
	}
	return acumulador
}


export function compose(funs:Function[]) {
    return function(x:any) {
        for (var i = funs.length - 1; i >= 0; i--) {
            x = funs[i](x);
        }
        return x;
    }
}

