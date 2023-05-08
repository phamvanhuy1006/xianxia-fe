export const randomUniqueKey = () => {
    return Math.random().toString(36).substring(2);
}

export const convertBreakToHtml = (text: string) => {
    return text && text.replace(/\r?\n/g, '<br/>');
};

export const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))