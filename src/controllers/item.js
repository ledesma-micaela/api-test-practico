const got = require('got');
const { FilteredItems, ItemDetails } = require('../models/item');

const apiUrl = 'https://api.mercadolibre.com';
const author = {
  name: 'Micaela',
  lastname: 'Ledesma'
};

exports.getFilteredItems = async (req, res) => {
  const searchParam = req.query.q;
  if (!searchParam) {
    return res.status(400).json({ error: "Missing search params" });
  }

  try {
		const { body } = await got(`${apiUrl}/sites/MLA/search?q=${searchParam}`, { responseType: 'json' });
    let items = FilteredItems(body.results);
    items = { author, ...items };

    res.json(items);
	} catch (error) {
    res.status(error.response.statusCode).json(error.response.body);
	}  
}

exports.getItemDetails = async (req, res) => {
  const itemId = req.params.id;

  try {
		const { body } = await got(`${apiUrl}/items/${itemId}`, { responseType: 'json' });
    const descriptionResponse  = await got(`${apiUrl}/items/${itemId}/description`, { responseType: 'json' });

    let item = ItemDetails(body);
    item = { author, ...item };
    item.item.description = descriptionResponse.body.plain_text;
    res.json(item);
	} catch (error) {
    res.status(error.response.statusCode).json(error.response.body);
	}  
}
