const advancedResults = (model, populate) => async(req, res, next) => {
  let query;
    // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to remove
  const removeFields = ['select', 'sort', 'limit', 'page'];
  removeFields.forEach(param => delete reqQuery[param]);
  
  // Create query string
  let queryString = JSON.stringify(reqQuery);

  // Create operators ($gte, $lte, $in)
  queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
  query = model.find(JSON.parse(queryString))

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  } 
  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();
  query.skip(startIndex).limit(limit);

  if (populate) {
      query = query.populate(populate);
  }
  
  // Execute query
  query.exec((err, data) => {
    if(err) {
      res.advancedResults = {
        status: 'failure',
        code: res.statusCode,
        message: 'bootcamp not found'
      }
    }
    else{
      let pagination = {};
      if (endIndex < total) {
        pagination.next = {
          page: page + 1,
          limit: limit
        }
      }

      if (startIndex > 0) {
        pagination.prev = {
          page: page - 1,
          limit: limit
        }
      }
      res.advancedResults = {
        status: 'success',
        code: res.statusCode,
        count: data.length,
        message: 'Required bootcamp',
        pagination: pagination,
        data: data
      }
    }
    next();
  })
}

module.exports = advancedResults;