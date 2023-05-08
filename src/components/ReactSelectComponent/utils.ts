export const defaultAdditional = {
    page: 1
  };
  
  export const sleep = (ms: any) =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  
  export const loadOptions = async (search = '', page = 1, options = [], optionsPerPage = 10) => {
    let filteredOptions;
    if (!search) {
      filteredOptions = options;
    } else {
      const searchLower = search.toLowerCase();
      filteredOptions = options.filter((item: any) => item.label.toLowerCase().includes(searchLower));
    }
    const hasMore = Math.ceil(filteredOptions.length / optionsPerPage) > page;
    const slicedOptions = filteredOptions.slice((page - 1) * optionsPerPage, page * optionsPerPage);
  
    return {
      options: slicedOptions,
      hasMore
    };
  };
  