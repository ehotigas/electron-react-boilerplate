/* eslint import/prefer-default-export: off */
import * as csv from 'csv-stringify';
import { URL } from 'url';
import * as fs from 'fs';
import path from 'path';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

const verify_file_name = (file_name: string, path: string): string => {
  if (!fs.readdirSync(path).includes(file_name + '.csv')) return file_name;
  if (file_name.includes('_')) {
      let file_split = file_name.split('_');
      return verify_file_name(`${file_split[0]}_${Number(file_split[1]) + 1}`, path);
  }
  else {
      return verify_file_name(file_name + "_1", path)
  }
}

export const save = (out_path: string, file_name: string, data: Array<Object>, columns: string[]) => {
  file_name = `${verify_file_name(file_name, out_path)}.csv`;
  csv.stringify(data, {
      header : true,
      columns : columns
  }, (err, output) => {
      fs.writeFileSync(out_path + file_name, output);
  });
}
