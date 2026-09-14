module.exports = function (migration) {
  const product = migration.createContentType('product')
    .name('Product')
    .description('Tire product entity');

  product.createField('productName')
    .name('Product Name')
    .type('Symbol')
    .required(true);

  product.createField('brand')
    .name('Brand')
    .type('Symbol')
    .required(true);

  product.createField('model')
    .name('Model')
    .type('Symbol')
    .required(true);

  product.createField('category')
    .name('Category')
    .type('Symbol')
    .required(true);

  product.createField('slug')
    .name('Slug')
    .type('Symbol')
    .required(true);

  product.createField('isFeatured')
    .name('Featured Product')
    .type('Boolean');

  product.createField('description')
    .name('Description')
    .type('RichText');

  product.createField('mainImage')
    .name('Main Image')
    .type('Link')
    .linkType('Asset')
    .required(true);

  product.createField('technicalSheet')
    .name('Technical Sheet')
    .type('Link')
    .linkType('Asset');

  product.createField('notes')
    .name('Notes')
    .type('Text');

  product.createField('variants')
    .name('Variants')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [
        { linkContentType: ['variant'] }
      ]
    });

  product.displayField('productName');
};
