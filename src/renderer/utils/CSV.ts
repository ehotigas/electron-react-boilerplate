export interface CSV {
    header: any,
    dados: Array<any>
}


export const filter = (
    data: CSV,
    column: string,
    filtro: (data: any)=>boolean
): CSV => {
    let temp_data: CSV = { header: data.header, dados: [] };

    for (let i = 0; i < data.dados.length; i++)
        if (filtro(data.dados[i][column]))
            temp_data.dados.push(data.dados[i]);
    return temp_data;
}


export const select = (
    data: CSV,
    ...args: string[]
): CSV => {
    let temp_data: CSV = { header: {  }, dados: [] };

    for (let i = 0; i < data.dados.length; i++) {
        let temp = data.dados[i], obj: any = {  };
        args.forEach((arg) => { obj[arg] = temp[arg] });
        temp_data.dados.push(obj);
    }
    args.forEach((element: any): void => { temp_data.header[element] = data.header[element] })
    return temp_data;
}


export const getRows = (
    dados: Array<Object>,
    column: string
): Array<any> => {
    let arr: Array<any> = [];
    dados.forEach((element: any) => { if (!arr.includes(element[column]) && element[column] != undefined) arr.push(element[column]) });
    return arr;
}


export const getDistinct = (
    data: CSV,
    column: string
): CSV => {
    let temp_data: CSV = { header: data.header, dados: [] };
    getRows(data.dados, column).forEach(element => {
        for (let i = 0; i < data.dados.length; i++) {
            if (data.dados[i][column] === element) {
                temp_data.dados.push(data.dados[i]);
                break;
            }
        }
    });

    return temp_data;
}


export const sort = (
    data: CSV,
    column: string,
    order: string='asc',
    type: string='str'
): CSV => {
    if (order !== 'desc' && order !== 'asc') return data;
    let arr: Array<any> = Array.from(data.dados), temp_data: CSV = { header: data.header, dados: [] }, order_values: any = { asc: [-1, 1], desc: [1, -1] };


    const sort_date = (a: any, b: any) => {
        if (a[column] === undefined || b[column] === undefined) return 0;

        let arr_a = a[column].split('/'), arr_b = b[column].split('/');

        for (let i = 2; i >= 0; i--) {
            if (parseInt(arr_a[i]) < parseInt(arr_b[i])) return order_values[order][0];
            if (parseInt(arr_a[i]) > parseInt(arr_b[i])) return order_values[order][1];
        }
        return 0;
    }

    const sort_int = (a: any, b: any) => {
        if (a[column] === undefined || b[column] === undefined) return 0;
        if (parseInt(a[column]) < parseInt(b[column])) return order_values[order][0];
        if (parseInt(a[column]) > parseInt(b[column])) return order_values[order][1];
        return 0;
    }

    const sort_float = (a: any, b: any) => {
        if (a[column] === undefined || b[column] === undefined) return 0;
        if (parseFloat(String(a[column]).replace(',', '.')) < parseFloat(String(b[column]).replace(',', '.'))) return order_values[order][0];
        if (parseFloat(String(a[column]).replace(',', '.')) > parseFloat(String(b[column]).replace(',', '.'))) return order_values[order][1];
        return 0;
    }

    const sort_str = (a: any, b: any) => {
        if (a[column] === undefined || b[column] === undefined) return 0;
        if (a[column].toLowerCase() < b[column].toLowerCase()) return order_values[order][0];
        if (a[column].toLowerCase() > b[column].toLowerCase()) return order_values[order][1];
        return 0;
    }

    const dict: any = {
        date: sort_date,
        int: sort_int,
        float: sort_float,
        str: sort_str,
        number: sort_float
    }

    if (Object.keys(dict).includes(type)) arr.sort(dict[type]);
    else arr.sort(sort_str);
    temp_data['dados'] = arr;
    return temp_data;
}


export const withColumnRenamed = (
    data: CSV,
    column: string,
    newColumn: string
): CSV => {
    let temp_data: CSV = { header: {  }, dados: [] };
    data.dados.forEach(element => {
        let obj: any = {  };
        Object.keys(element).forEach(col => {
            if (col === column) obj[newColumn] = element[col];
            else obj[col] = element[col];
        });
        temp_data.dados.push(obj);
    });

    Object.keys(data.header).forEach(element => {
        if (element === column) temp_data.header[newColumn] = data.header[element];
        else temp_data.header[element] = data.header[element];
    });

    return temp_data;
}

export const orderBy = (
    data: CSV,
    column: string,
    how: string='asc',
    type: string='str'
): CSV => {
    return sort(data, column, how, type);
}
