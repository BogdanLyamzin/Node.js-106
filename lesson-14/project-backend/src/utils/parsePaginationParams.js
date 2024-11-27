const parseNumber = (number, defaultValue) => {
    if(typeof number !== "string") return defaultValue;

    const parsedNumber = parseInt(number);
    if(Number.isNaN(parseNumber)) return defaultValue;

    return parsedNumber;
}

export const parsePaginationParams = ({page, perPage}) => {
    const parsedPage = parseNumber(page, 1);
    const parsedPerPage = parseNumber(perPage, 10);

    return {
        page: parsedPage,
        perPage: parsedPerPage,
    }
}
