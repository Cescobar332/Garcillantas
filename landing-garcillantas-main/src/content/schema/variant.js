module.exports = function (migration) {
  const variant = migration.createContentType('variant')
    .name('Variant')
    .description('Variant of a product');

  variant.createField('product')
    .name('Product')
    .type('Link')
    .linkType('Entry')
    .required(true)
    .validations([{ linkContentType: ['product'] }]);

  variant.createField('width')
    .name('Width')
    .type('Integer')
    .required(true);

  variant.createField('aspectRatio')
    .name('Aspect Ratio')
    .type('Integer')
    .required(true);

  variant.createField('rimSize')
    .name('Rim Size')
    .type('Integer')
    .required(true);

  variant.createField('loadSpeedIndex')
    .name('Load/Speed Index')
    .type('Symbol')
    .required(true);

  variant.createField('tireType')
    .name('Tire Type')
    .type('Symbol')
    .required(true);

  variant.createField('seasonUsage')
    .name('Season / Usage')
    .type('Symbol')
    .required(true);

  variant.createField('line')
    .name('Line')
    .type('Symbol');

  variant.createField('price')
    .name('Price')
    .type('Number')
    .required(true);

  variant.createField('stock')
    .name('Stock')
    .type('Integer')
    .required(true);

  variant.createField('variantImage')
    .name('Variant Image')
    .type('Link')
    .linkType('Asset');

  variant.createField('variantTechnicalSheet')
    .name('Variant Technical Sheet')
    .type('Link')
    .linkType('Asset');

  variant.displayField('tireType');
};
