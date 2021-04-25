exports.FilteredItems = (data) => {
  let categoryFilters = data.filters.length ? data.filters : data.available_filters;
  return {
    categories: findCategories(categoryFilters),
    items: getItems(data.results)
  };
}

exports.ItemDetails = (data) => {
  let item = getItemMainDetails(data);
  item = {
    ...item,
    picture: data.pictures[0].url,
    sold_quantity: data.sold_quantity
  };

  return { item };
}

function getItemMainDetails(data) {
  return {
    id: data.id,
    title: data.title,
    price: {
      currency: data.currency_id,
      amount: Math.trunc(data.price),
      decimals: getDecimals(data.price)
    },
    condition: data.condition,
    free_shipping: data.shipping.free_shipping,
  };
}

function findCategories(data) {
  const categoryFilter = data.find(filter => filter.id === 'category') || [];

  if (categoryFilter.values[0].path_from_root) {
    const categoryValues = categoryFilter.values[0].path_from_root;
    return categoryValues.map(element => element.name);
  } else {
    const max = categoryFilter.values.reduce((prev, current) => (prev.results > current.results) ? prev : current);
    return [max.name];
  }
}

function getItems(data) {
  const items = [];

  data.forEach(element => {
    let item = getItemMainDetails(element);
    item = { 
      ...item,
      picture: element.thumbnail,
      address_state: element.address.state_name
    }

    items.push(item)
  });

  return items;
}

function getDecimals(price) {
  const decimals = price.toString().split('.')[1];
  return parseInt(decimals) / 100;
}
