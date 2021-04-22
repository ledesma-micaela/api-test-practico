exports.FilteredItems = (data) => {
  return {
    categories: findCategories(data),
    items: getItems(data)
  }
}

exports.ItemDetails = (data) => {
  return {
    item: {
      id: data.id,
      title: data.title,
      price: {
        currency: data.currency_id,
        amount: Math.trunc(data.price),
        decimals: getDecimals(data.price)
      },
      picture: data.pictures[0].url,
      condition: data.condition,
      free_shipping: data.shipping.free_shipping,
      sold_quantity: data.sold_quantity
    }
  }
}

function findCategories(data) {
  const categories = [];
  data.forEach(element => {
    if (!categories.includes(element.category_id)) {
      categories.push(element.category_id);
    }
  });
  return categories;
}

function getItems(data) {
  const items = [];
  data.forEach(element => {
    const item = {
      id: element.id,
      title: element.title,
      price: {
        currency: element.currency_id,
        amount: Math.trunc(element.price),
        decimals: getDecimals(element.price)
      },
      picture: element.thumbnail,
      condition: element.condition,
      free_shipping: element.shipping.free_shipping
    }
    items.push(item)
  });
  return items;
}

function getDecimals(price) {
  const decimals = price.toString().split('.')[1];
  return parseInt(decimals) / 100;
}
